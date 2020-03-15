const { Team } = require('./../models/team.model');


module.exports.addTeam = async(req, res) => {

    req.body.members = [req.user._id]
    const team = new Team(req.body)

    try {
        await team.save()
        res.status(201).send(team)
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports.getMyTeam = async(req, res) => {
    try {


        const team = await Team.findById(req.user.currentTeam).then((team) => {
            return team

        })


        res.send(team)


    } catch (e) {
        res.status(500).send(e)
    }

}
module.exports.addTeamMember = async(req, res) => {


    try {

        if (req.params.teamid) {
            const team = await Team.findById(req.params.teamid).then((team) => {



                req.user.currentTeam = req.params.teamid
                team.members.push(req.user._id)
                team.save()
                req.user.save()
                return team

            })
            res.send(team)
        }
    } catch (e) {

        res.status(500).send(e)

    }


}
module.exports.removeTeamMember = async(req, res) => {


    try {
        let team;
        if (req.user.currentTeam) {
            team = await Team.findById(req.user.currentTeam).then(async(team) => {


                console.log(req.user.currentTeam);
                console.log(team.members);


                req.user.currentTeam = null;


                team.members.remove(req.user._id)
                console.log(team.members);
                if (team.members.length <= 0) {
                    await team.remove()
                    res.send("Team is deleted ")
                }
                team.save()
                req.user.save()
                return team

            })
            res.send(team)

        } else {
            res.send("you do not have team")
        }
    } catch (e) {

        res.status(500).send(e)

    }


}


module.exports.getOtherTeam = async(req, res) => {

    try {


        const team = await Team.findById(req.params.teamid).then((team) => {
            return team

        })
        res.send(team)

    } catch (e) {

        res.status(500).send(e)

    }

}
module.exports.getAllTeams = async(req, res) => {

    try {

        const team = await Team.find({})
        console.log(team);

        res.status(200).send(team)

    } catch (e) {

        res.status(500).send(e)

    }

}
module.exports.updateMyteam = async(req, res) => {
    console.log("reqbody  ", req.body)


    const updates = Object.keys(req.body)
    console.log("updatesssssssss : ", updates);

    const allowedUpdates = ['name', 'picture', 'roomId']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    let team;
    try {


        team = await Team.findById(req.user.currentTeam).then((team) => {
            return team

        })


    } catch (e) {
        res.status(500).send(e)
    }

    try {
        updates.forEach((update) => {
            console.log(update);

            team[update] = req.body[update]
        })
        console.log(team);

        await team.save()
        res.send(team)
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports.updateTeamScore = async(req, res) => {
    console.log("reqbody  ", req.body)


    const updates = Object.keys(req.body)
    console.log("updatesssssssss : ", updates);

    const allowedUpdates = ['score']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    let team;
    try {


        team = await Team.findById(req.params.teamid).then((team) => {
            return team

        })


    } catch (e) {
        res.status(500).send(e)
    }

    try {
        updates.forEach((update) => {
            console.log(update);

            team[update] = req.body[update]
        })
        console.log(team);

        await team.save()
        res.send(team)
    } catch (e) {
        res.status(400).send(e)
    }
}
module.exports.deleteAccount = async(req, res) => {

    try {



        await req.user.currentTeam.remove()
            // await req.user.remove()
            // console.log("***********************************");
        console.log(req.user.currentTeam);
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }

}