const { Form } = require('./../models/form.model');


module.exports.addForm = async(req, res) => {



    const form = new Form(req.body)

    try {
        await form.save()
        res.status(201).send(form)
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports.getAllForms = async(req, res) => {

    try {

        const forms = await Form.find({})
            //console.log(forms);

        res.status(200).send(forms)

    } catch (e) {

        res.status(500).send(e)

    }

}

module.exports.getFormById = async(req, res) => {

    try {

        const form = await Form.findById(req.params.formid)
            //console.log(form);

        res.status(200).send(form)

    } catch (e) {

        res.status(500).send(e)

    }

}

module.exports.updateForm = async(req, res) => {



    const updates = Object.keys(req.body)


    const allowedUpdates = ['questions', 'maxPointForQuestion']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    let form;
    try {
        console.log(req.params.formid);

        form = await Form.findById(req.params.formid)
        console.log(form);
        updates.forEach((update) => {
            //  console.log(update);

            form[update] = req.body[update]
        })


        await form.save()
        res.send(form)

    } catch (e) {
        res.status(500).send(e)
    }


}

module.exports.deleteForm = async(req, res) => {

    try {

        const form = await Form.findByIdAndRemove(req.params.formid);

        res.send({
            msg: 'Form deleted successfully',
            form
        })
    } catch (e) {
        res.status(500).send()
    }

}