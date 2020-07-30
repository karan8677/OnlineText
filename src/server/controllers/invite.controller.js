import jwtModule from '../modules/jwt.module'
import inviteModule from '../modules/invite.module'
import userDataModule from '../modules/userData.module'
import chatRoomModule from '../modules/chatRoom.module'


const getFriendInvite = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token).then((jwtVerify_result) => {

        userDataModule.getUserID(jwtVerify_result._id).then((getUserID_result) => {

            inviteModule.getFriendInvite(getUserID_result.UserID).then((getFriendInvite_result) => {

                var jsonpackage = {}
                jsonpackage["messageName"] = "friendInvite"
                jsonpackage["data"] = getFriendInvite_result
                res.send(JSON.stringify(jsonpackage))

            }).catch((err) => {

                res.send(err)

            })

        }).catch((err) => {

            res.send(err)

        })

    }).catch((err) => {

        res.send(err)

    })

}

const deleteFriendInvite = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token).then((jwtVerify_result) => {

        userDataModule.getUserID(jwtVerify_result._id).then((toUserID_result) => {

            userDataModule.getUserID(req.params.userName).then((fromUserID_result) => {

                inviteModule.deleteFriendInvite(toUserID_result.UserID, fromUserID_result.UserID).then((deleteFriendInvite_result) => {

                }).catch((err) => {

                    res.send(err)

                })

            }).catch((err) => {

                res.send(err)

            })

        }).catch((err) => {

            res.send(err)

        })
        

    }).catch((err) => {

        res.send(err)

    })

}

const postFriendInvite = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token).then((jwtVerify_result) => {

        userDataModule.getUserID(jwtVerify_result._id).then((fromUserID_result) => {

            userDataModule.getUserID(req.params.userName).then((toUserID_result) => {

                inviteModule.postFriendInvite(toUserID_result.UserID, fromUserID_result.UserID).then((postFriendInvite_result) => {

                }).catch((err) => {

                    res.send(err)

                })

            }).catch((err) => {

                res.send(err)

            })

        }).catch((err) => {

            res.send(err)

        })

        

    }).catch((err) => {

        res.send(err)

    })

}

const getGroupInvite = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token).then((jwtVerify_result) => {

        userDataModule.getUserID(jwtVerify_result._id).then((getUserID_result) => {

            inviteModule.getGroupInvite(getUserID_result.UserID).then((deleteGroupInvite_result) => {

                var jsonpackage = {}
                jsonpackage["messageName"] = "groupInvite"
                jsonpackage["data"] = deleteGroupInvite_result
                res.send(JSON.stringify(jsonpackage))

            }).catch((err) => {

                res.send(err)

            })

        }).catch((err) => {

            res.send(err)

        })

    }).catch((err) => {

        res.send(err)

    })

}

const deleteGroupInvite = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token).then((jwtVerify_result) => {

        userDataModule.getUserID(jwtVerify_result._id).then((getUserID_result) => {

            chatRoomModule.getRoomID(req.params.roomName).then((getRoomID_result) => {

                inviteModule.deleteGroupInvite(getUserID_result.UserID, getRoomID_result).then((deleteGroupInvite_result) => {

                }).catch((err) => {

                    res.send(err)

                })

            }).catch((err) => {

                res.send(err)

            })

        }).catch((err) => {

            res.send(err)

        })

    }).catch((err) => {

        res.send(err)

    })

}

const postGroupInvite = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token).then((jwtVerify_result) => {

        userDataModule.getUserID(jwtVerify_result._id).then((getUserID_result) => {

            chatRoomModule.getRoomID(req.params.roomName).then((getRoomID_result) => {

                inviteModule.postGroupInvite(getUserID_result.UserID, getRoomID_result).then((postGroupInvite_result) => {

                }).catch((err) => {

                    res.send(err)

                })

            }).catch((err) => {

                res.send(err)

            })

        }).catch((err) => {

            res.send(err)

        })
        

    }).catch((err) => {

        res.send(err)

    })

}

export default {
    getFriendInvite,
    deleteFriendInvite,
    postFriendInvite,
    getGroupInvite,
    deleteGroupInvite,
    postGroupInvite
}