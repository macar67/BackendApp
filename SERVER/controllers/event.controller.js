const { Event } = require('./../models/event.model');


module.exports.addEvent = async(req, res) => {

    req.body.members = [req.user._id]
    const event = new Event(req.body)

    try {
        await event.save()
        res.status(201).send(event)
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports.updateEvent = async(req, res) => {
    console.log("reqbody  ", req.body)


    const updates = Object.keys(req.body)
    console.log("updates : ", updates);

    const allowedUpdates = ['name', 'description', 'startDate', 'endDate', 'schedule', 'participants', 'maxTeamNumber', 'minTeamNumber', 'location', 'rooms', 'juries', 'moderators'];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    let event;
    try {


        event = await Event.findById(req.params.eventid).then((event) => {
            return event

        })


    } catch (e) {
        res.status(500).send(e)
    }
    module.exports.updateEvent = async(req, res) => {
        try {
            updates.forEach((update) => {
                    //console.log(update);

                    event[update] = req.body[update]
                })
                //console.log(team);

            await event.save()
            res.send(event)
        } catch (e) {
            res.status(400).send(e)
        }
    }
    module.exports.getAllEvents = async(req, res) => {

        try {

            const events = await Event.find({})
                //console.log(events);

            res.status(200).send(events)

        } catch (e) {

            res.status(500).send(e)

        }

    }
}