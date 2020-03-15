const { Room } = require('./../models/room.model');
const { Team } = require('./../models/team.model');

//sign up operation  -- is done 
module.exports.addNewRoom = async(req, res) => {

    const room = new Room(req.body)

    try {
        await room.save()
        res.status(201).send(room)
    } catch (e) {
        res.status(400).send(e)
    }
}
module.exports.myTeamsRoom = async(req, res) => {



    console.log('[roomController:myTeamsRoom] users current team:', req.user.currentTeam);


    if (req.user.currentTeam) {



        const room = await Team.findById(req.user.currentTeam).then(async(team) => {

            console.log('[roomController:myTeamsRoom] team\'s roomid: ', team.roomId);


            return await Room.findById(team.roomId).then((room) => room).catch((r) => {
                console.log(r);
            })


        }).catch((e) => {
            console.log(e);
        })
        res.send(room)
    } else {
        console.log("no ");

    }


}
module.exports.showAllRooms = async(req, res) => {

    try {

        const rooms = await Room.find({})
            //console.log(rooms);

        res.status(200).send(rooms)

    } catch (e) {

        res.status(500).send(e)

    }

}

module.exports.updateRoom = async(req, res) => {



    const updates = Object.keys(req.body)


    const allowedUpdates = ['name', 'maxTeamSize']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    let team;
    let room;
    try {
        console.log(req.user.currentTeam);

        team = await Team.findById(req.user.currentTeam)
        console.log(team);
        room = await Room.findById(team.roomId)
        console.log(room);
        updates.forEach((update) => {
            //  console.log(update);

            room[update] = req.body[update]
        })


        await team.save()
        await room.save()
        res.send(room)

    } catch (e) {
        res.status(500).send(e)
    }


}

module.exports.deleteMyRoom = async(req, res) => {

    try {
        console.log(req.user.currentTeam);

        const room = await Team.findById(req.user.currentTeam).then(async(team) => {

            console.log('[roomController:deleteMyRoom] team\'s roomid: ', team.roomId);


            let room = await Room.findByIdAndDelete(team.roomId).then((room) => room).catch((r) => {
                console.log(r);
            });
            team.roomId = null;
            await team.save();
            return room;

        }).catch((e) => {
            console.log(e);
        })


        if (room) {
            res.send({
                msg: 'Room deleted succesfuly',
                room
            })
        } else {
            res.send({ msg: 'There is no such room.' });
        }

    } catch (e) {
        res.status(500).send()
    }

}