function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var userData = {};
var groupList = {};
var friendList = {};
var groupInviteList = {};
var friendInviteList = {};
var groupMessageActive = 0;
var groupChatingID = 0;
var friendMessageActive = 1;
var friendChatingID = 0;
let ws = new WebSocket('wss://127.0.0.1:3000');

function sendWebSocket(unstringifyData) {
    var data = JSON.stringify(unstringifyData);
    ws.send(data);
}

function getUserData() {
    var xhr_userData = new XMLHttpRequest();
    xhr_userData.open("GET", "file/userData");

    xhr_userData.onload = function () {
        var onLoadMessage = JSON.parse(xhr_userData.responseText);

        if (onLoadMessage.messageName === "userData") {
            userData["userName"] = onLoadMessage.data[0].userName;
            userData["userID"] = onLoadMessage.data[0].userID;
            ReactDOM.render( /*#__PURE__*/React.createElement(SetBar, {
                data: userData["userName"],
                input: 0,
                page: "homePage"
            }), document.getElementById('setBar'));
            ReactDOM.render( /*#__PURE__*/React.createElement(SelfData, {
                data: 1
            }), document.getElementById('selfData'));
            var webSocketList = {};
            webSocketList["messageName"] = "userAccount";
            webSocketList["data"] = userData["userName"];
            sendWebSocket(webSocketList);
        }
    };

    xhr_userData.send();
}

function getGroup() {
    var xhr_getGroup = new XMLHttpRequest();
    xhr_getGroup.open("GET", "file/group");

    xhr_getGroup.onload = function () {
        var onLoadMessage = JSON.parse(xhr_getGroup.responseText);

        if (onLoadMessage.messageName === "getGroup") {
            groupList = onLoadMessage.data;
            ReactDOM.render( /*#__PURE__*/React.createElement(RoomList, {
                data: groupList
            }), document.getElementById('roomList'));
        }
    };

    xhr_getGroup.send();
}

function getFriend() {
    var xhr_getFriend = new XMLHttpRequest();
    xhr_getFriend.open("GET", "file/friend");

    xhr_getFriend.onload = function () {
        var onLoadMessage = JSON.parse(xhr_getFriend.responseText);

        if (onLoadMessage.messageName === "getFriend") {
            friendList = onLoadMessage.data;

            if (friendMessageActive) {
                // ReactDOM.render(<SelfData data={1} />, document.getElementById('selfData'))
                // ReactDOM.render(<RoomList data={groupList} />, document.getElementById('roomList'));
                // ReactDOM.render(<SetBar data={userData["userName"]} input={0} page={"homePage"} />, document.getElementById('setBar'))
                ReactDOM.render( /*#__PURE__*/React.createElement(HomePage, null), document.getElementById('messageBoard'));
            }
        }
    };

    xhr_getFriend.send();
}

function getInvite() {
    var xhr_friendInvite = new XMLHttpRequest();
    xhr_friendInvite.open("GET", "file/friendInvite");

    xhr_friendInvite.onload = function () {
        var onLoadMessage = JSON.parse(xhr_friendInvite.responseText);

        if (onLoadMessage.messageName === "getFriendInvite") {
            friendInviteList = onLoadMessage.data;
            ReactDOM.render( /*#__PURE__*/React.createElement(InviteList, {
                groupData: groupInviteList,
                friendData: friendInviteList
            }), document.getElementById('inviteList'));
        }
    };

    var xhr_groupInvite = new XMLHttpRequest();
    xhr_groupInvite.open("GET", "file/groupInvite");

    xhr_groupInvite.onload = function () {
        var onLoadMessage = JSON.parse(xhr_groupInvite.responseText);

        if (onLoadMessage.messageName === "getGroupInvite") {
            groupInviteList = onLoadMessage.data;
            xhr_friendInvite.send();
        }
    };

    xhr_groupInvite.send();
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return /*#__PURE__*/React.createElement("div", {
            className: "flexRow",
            style: {
                width: "100 %",
                minWidth: "240px",
                height: "100%"
            }
        }, /*#__PURE__*/React.createElement("div", {
            className: "groupListAndHomePageContainer flexColumn "
        }, /*#__PURE__*/React.createElement("div", {
            className: "selfData",
            id: "selfData"
        }), /*#__PURE__*/React.createElement("div", {
            style: {
                flexBasis: "20px",
                color: "#ADADAD",
                margin: "auto",
                textAlign: "center"
            }
        }, "group List"), /*#__PURE__*/React.createElement("div", {
            className: "groupList"
        }, /*#__PURE__*/React.createElement("ul", {
            className: "nav",
            id: "roomList"
        }))), /*#__PURE__*/React.createElement("div", {
            className: "messageContent flexColumn"
        }, /*#__PURE__*/React.createElement("div", {
            className: "setBar",
            id: "setBar"
        }), /*#__PURE__*/React.createElement("div", {
            className: "message flexColumn"
        }, /*#__PURE__*/React.createElement("div", {
            className: "messageBoard",
            id: "messageBoard"
        }), /*#__PURE__*/React.createElement("div", {
            className: "messageInputAndMessageSendContainer",
            id: "messageSender"
        }))), /*#__PURE__*/React.createElement("div", {
            className: "inviteBar flexColumn"
        }, /*#__PURE__*/React.createElement("div", {
            className: "inviteMessage",
            id: "inviteList"
        })));
    }

    componentDidMount() {
        getGroup();
        getFriend();
        getInvite();

        ws.onopen = () => {
            getUserData();
            console.log('open connection');
        };

        ws.onclose = () => {
            console.log('close connection');
        };

        ws.onmessage = data => {
            var parseData = JSON.parse(data.data);

            switch (parseData.messageName) {
                case "groupMessage":
                    if (groupMessageActive && parseData.data[0].groupID === groupChatingID) {
                        ReactDOM.render( /*#__PURE__*/React.createElement(Message, {
                            data: parseData.data,
                            reset: 0
                        }), document.getElementById('messageBoard'));
                    }

                    break;

                case "friendMessage":
                    if (friendMessageActive && parseData.data[0].friendID === friendChatingID) {
                        ReactDOM.render( /*#__PURE__*/React.createElement(FriendMessage, {
                            data: parseData.data,
                            reset: 0
                        }), document.getElementById("friendMessageAndUserSetting"));
                    }

                    break;

                default:
                    break;
            }
        };
    }

}

class RoomList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupList: this.props.data,
            active: 1
        };
    }

    render() {
        const group = [];

        if (this.state.active === 1) {
            this.state.active = 0;
        } else {
            this.state.active = 1;
        }

        for (var num = 0; num < this.state.groupList.length; num++) {
            group.push( /*#__PURE__*/React.createElement("li", {
                key: this.state.groupList[num].groupID
            }, /*#__PURE__*/React.createElement("a", {
                className: this.state.active,
                "data-toggle": "pill",
                role: "pill"
            }, /*#__PURE__*/React.createElement("div", {
                className: "iconPadding"
            }, /*#__PURE__*/React.createElement("div", {
                className: "iconTrigger"
            }, /*#__PURE__*/React.createElement("img", {
                src: "/images/MainIcon.png",
                className: "groupIconContainer",
                id: this.state.groupList[num].groupID,
                name: this.state.groupList[num].groupName,
                onClick: e => {
                    this.weclick(e);
                }
                /*onClick={this.weclick.bind(this)}*/

            }))))));
        }

        return group;
    }

    shouldComponentUpdate(nextProps) {
        this.state.groupList = nextProps.data;
        return true;
    }

    weclick(event) {
        var roomName = event.target.name;
        var roomID = event.target.id;
        var xhr_groupOldMessage = new XMLHttpRequest();
        xhr_groupOldMessage.open("GET", "file/oldGroupMessage/" + roomID + "/0");

        xhr_groupOldMessage.onload = function () {
            var onLoadMessage = JSON.parse(xhr_groupOldMessage.responseText);

            if (onLoadMessage.messageName === "getOldGroupMessage") {
                groupMessageActive = 1;
                friendMessageActive = 0;
                groupChatingID = roomID;
                ReactDOM.render( /*#__PURE__*/React.createElement(SetBar, {
                    data: roomName,
                    roomID: roomID,
                    page: "groupPage",
                    reset: 1
                }), document.getElementById('setBar'));
                ReactDOM.render( /*#__PURE__*/React.createElement(Message, {
                    data: onLoadMessage.data,
                    reset: 1,
                    id: roomID
                }), document.getElementById('messageBoard'));
                ReactDOM.render( /*#__PURE__*/React.createElement(SelfData, {
                    data: 0
                }), document.getElementById('selfData'));
            }
        };

        xhr_groupOldMessage.send();
    }

}

class InviteList extends React.Component {
    constructor(props) {
        super(props);

        _defineProperty(this, "inviteCount", 0);

        this.state = {
            groupInviteList: this.props.groupData,
            friendInviteList: this.props.friendData
        };
    }

    accept(event) {
        var targetID = event.target.id;
        var type = event.target.name;

        switch (type) {
            case "group":
                var xml_inviteAccept = new XMLHttpRequest();
                xml_inviteAccept.open("POST", "file/group/" + targetID);

                xml_inviteAccept.onload = function () {
                    var onLoadMessage = JSON.parse(xml_inviteAccept.responseText);
                    console.log(onLoadMessage);

                    if (onLoadMessage.messageName === "joinGroup" && onLoadMessage.data === "success") {
                        document.getElementById(targetID + "group").remove();
                        getGroup();
                    }
                };

                xml_inviteAccept.send();
                break;

            case "friend":
                var xml_inviteAccept = new XMLHttpRequest();
                xml_inviteAccept.open("POST", "file/friend/" + targetID);

                xml_inviteAccept.onload = function () {
                    var onLoadMessage = JSON.parse(xml_inviteAccept.responseText);

                    if (onLoadMessage.messageName === "addFriend" && onLoadMessage.data === "success") {
                        document.getElementById(targetID + "friend").remove();
                        getFriend();
                    }
                };

                xml_inviteAccept.send();
                break;

            default:
                break;
        }
    }

    reject(event) {
        var targetID = event.target.id;
        var type = event.target.name;

        switch (type) {
            case "group":
                var xml_inviteReject = new XMLHttpRequest();
                xml_inviteReject.open("DELETE", "file/groupInvite/" + targetID);

                xml_inviteReject.onload = function () {
                    var onLoadMessage = JSON.parse(xml_inviteReject.responseText);

                    if (onLoadMessage.messageName === "rejectGroupInvite" && onLoadMessage.data === "success") {
                        document.getElementById(targetID + "group").remove();
                    }
                };

                xml_inviteReject.send();
                break;

            case "friend":
                var xml_inviteReject = new XMLHttpRequest();
                xml_inviteReject.open("DELETE", "file/friendInvite/" + targetID);

                xml_inviteReject.onload = function () {
                    var onLoadMessage = JSON.parse(xml_inviteReject.responseText);

                    if (onLoadMessage.messageName === "rejectFriendInvite" && onLoadMessage.data === "success") {
                        document.getElementById(targetID + "friend").remove();
                    }
                };

                xml_inviteReject.send();
                break;

            default:
                break;
        }
    }

    render() {
        const invite = [];

        for (var num = 0; num < this.state.groupInviteList.length; num++) {
            invite.push( /*#__PURE__*/React.createElement("div", {
                className: "inviteContainer flexColumn",
                key: this.inviteCount++,
                id: this.state.groupInviteList[num].groupID + "group"
            }, /*#__PURE__*/React.createElement("div", {
                className: "text"
            }, this.state.groupInviteList[num].groupName), /*#__PURE__*/React.createElement("div", {
                className: "checkBoxContainer flexRow"
            }, /*#__PURE__*/React.createElement("div", {
                className: "checkBox"
            }, /*#__PURE__*/React.createElement("div", {
                className: "checkTrigger"
            }, /*#__PURE__*/React.createElement("img", {
                src: "/images/checked.png",
                className: "checkIcon",
                id: this.state.groupInviteList[num].groupID,
                name: "group",
                onClick: e => this.accept(e)
            }))), /*#__PURE__*/React.createElement("div", {
                className: "checkBox"
            }, /*#__PURE__*/React.createElement("div", {
                className: "checkTrigger"
            }, /*#__PURE__*/React.createElement("img", {
                src: "/images/unchecked.png",
                className: "checkIcon",
                id: this.state.groupInviteList[num].groupID,
                name: "group",
                onClick: e => this.reject(e)
            }))))));
        }

        for (var num = 0; num < this.state.friendInviteList.length; num++) {
            invite.push( /*#__PURE__*/React.createElement("div", {
                className: "inviteContainer flexColumn",
                key: this.inviteCount++,
                id: this.state.friendInviteList[num].userID + "friend"
            }, /*#__PURE__*/React.createElement("div", {
                className: "text"
            }, this.state.friendInviteList[num].userName), /*#__PURE__*/React.createElement("div", {
                className: "checkBoxContainer flexRow"
            }, /*#__PURE__*/React.createElement("div", {
                className: "checkBox"
            }, /*#__PURE__*/React.createElement("div", {
                className: "checkTrigger"
            }, /*#__PURE__*/React.createElement("img", {
                src: "/images/checked.png",
                className: "checkIcon",
                id: this.state.friendInviteList[num].userID,
                name: "friend",
                onClick: e => this.accept(e)
            }))), /*#__PURE__*/React.createElement("div", {
                className: "checkBox"
            }, /*#__PURE__*/React.createElement("div", {
                className: "checkTrigger"
            }, /*#__PURE__*/React.createElement("img", {
                src: "/images/unchecked.png",
                className: "checkIcon",
                id: this.state.friendInviteList[num].userID,
                name: "friend",
                onClick: e => this.reject(e)
            }))))));
        }

        return invite;
    }

}

class Message extends React.Component {
    constructor(props) {
        super(props);

        _defineProperty(this, "message", []);

        _defineProperty(this, "messageCount", 0);

        this.state = {
            message: this.props.data,
            reset: this.props.reset,
            id: this.props.id
        };
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.data !== undefined) this.state.message = nextProps.data;
        if (nextProps.reset !== undefined) this.state.reset = nextProps.reset;
        if (nextProps.id !== undefined) this.state.id = nextProps.id;

        if (this.state.id !== groupChatingID) {
            return false;
        }

        return true;
    }

    render() {
        if (this.state.reset === 1) {
            this.message = [];
            this.messageCount = 0;
        }

        for (var num = 0; num < this.state.message.length; num++) {
            if (this.state.message[num].fromUserName === userData["userName"]) {
                this.message.push( /*#__PURE__*/React.createElement("div", {
                    className: "messageContainer flexRow",
                    key: this.messageCount++,
                    style: {
                        textAlign: "right"
                    }
                }, /*#__PURE__*/React.createElement("div", {
                    className: "messageFromAndArtical"
                }, /*#__PURE__*/React.createElement("div", {
                    className: "messageFrom"
                }, this.state.message[num].fromUserName), /*#__PURE__*/React.createElement("div", {
                    className: "messageArtical"
                }, this.state.message[num].message)), /*#__PURE__*/React.createElement("div", {
                    className: "messageImgContaniner flexColumn"
                }, /*#__PURE__*/React.createElement("img", {
                    src: "/images/MainIcon.png",
                    className: "messageImg",
                    style: {
                        backgroundColor: "yellow"
                    }
                }))));
            } else {
                this.message.push( /*#__PURE__*/React.createElement("div", {
                    className: "messageContainer flexRow",
                    key: this.messageCount++
                }, /*#__PURE__*/React.createElement("div", {
                    className: "messageImgContaniner flexColumn"
                }, /*#__PURE__*/React.createElement("img", {
                    src: "/images/MainIcon.png",
                    className: "messageImg",
                    style: {
                        backgroundColor: "yellow"
                    }
                })), /*#__PURE__*/React.createElement("div", {
                    className: "messageFromAndArtical"
                }, /*#__PURE__*/React.createElement("div", {
                    className: "messageFrom"
                }, this.state.message[num].fromUserName), /*#__PURE__*/React.createElement("div", {
                    className: "messageArtical"
                }, this.state.message[num].message))));
            }
        }

        return this.message;
    }

}

class SetBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: this.props.data,
            roomID: this.props.roomID,
            friendID: this.props.friendID,
            page: this.props.page
        };
    }

    shouldComponentUpdate(nextProps) {
        this.state.Name = nextProps.data;
        this.state.roomID = nextProps.roomID;
        this.state.friendID = nextProps.friendID;
        this.state.page = nextProps.page;
        return true;
    }

    componentDidMount() {
        ReactDOM.render( /*#__PURE__*/React.createElement(MessageSender, {
            page: this.state.page,
            friendID: this.state.friendID,
            roomID: this.state.roomID
        }), document.getElementById('messageSender'));
    }

    componentDidUpdate() {
        ReactDOM.render( /*#__PURE__*/React.createElement(MessageSender, {
            page: this.state.page,
            friendID: this.state.friendID,
            roomID: this.state.roomID
        }), document.getElementById('messageSender'));
    }

    sendInvite(data) {
        var xhr_sendGroupInvite = new XMLHttpRequest();
        xhr_sendGroupInvite.open("POST", "file/groupInvite/" + document.getElementById("inviteInput").value + "/" + data);

        xhr_sendGroupInvite.onload = function () {
            var onLoadMessage = JSON.parse(xhr_sendGroupInvite.responseText);

            if (onLoadMessage.messageName === "sendGroupInvite") { }
        };

        xhr_sendGroupInvite.send();
        document.getElementById("inviteInput").value = "";
    }

    render() {
        switch (this.state.page) {
            case "groupPage":
                return /*#__PURE__*/React.createElement("div", {
                    className: "flexRow setBarColumn",
                    style: {
                        height: "100%"
                    }
                }, /*#__PURE__*/React.createElement("div", {
                    className: "titleContainer"
                }, /*#__PURE__*/React.createElement("div", {
                    className: "titleText"
                }, " Group : ", this.state.Name)), /*#__PURE__*/React.createElement("div", {
                    className: "inputContainer"
                }, /*#__PURE__*/React.createElement("input", {
                    type: "text",
                    className: "form-control input text-white",
                    id: "inviteInput"
                })), /*#__PURE__*/React.createElement("div", {
                    className: "sendContainer"
                }, /*#__PURE__*/React.createElement("button", {
                    type: "button",
                    className: "btn btn-dark",
                    onClick: e => {
                        this.sendInvite(this.state.roomID);
                    }
                }, "add member")));
                break;

            case "homePage":
                return /*#__PURE__*/React.createElement("div", {
                    className: "titleContainer"
                }, /*#__PURE__*/React.createElement("div", {
                    className: "titleText"
                }, " HomePage : ", this.state.Name));
                break;

            case "friendPage":
                return /*#__PURE__*/React.createElement("div", {
                    className: "titleContainer"
                }, /*#__PURE__*/React.createElement("div", {
                    className: "titleText"
                }, " Frined : ", this.state.Name));
                break;

            default:
                return /*#__PURE__*/React.createElement("div", {
                    className: "titleContainer"
                }, /*#__PURE__*/React.createElement("div", {
                    className: "titleText"
                }, " HomePage : ", this.state.Name));
                break;
        }
    }

}

class SelfData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.data
        };
    }

    shouldComponentUpdate(nextProps) {
        this.state.active = nextProps.data;
        return true;
    }

    clickSelfData() {
        ReactDOM.render( /*#__PURE__*/React.createElement(SelfData, {
            data: 1
        }), document.getElementById('selfData'));
        ReactDOM.render( /*#__PURE__*/React.createElement(RoomList, {
            data: groupList
        }), document.getElementById('roomList'));
        ReactDOM.render( /*#__PURE__*/React.createElement(SetBar, {
            data: userData["userName"],
            input: 0,
            page: "homePage"
        }), document.getElementById('setBar'));
        ReactDOM.render( /*#__PURE__*/React.createElement(HomePage, null), document.getElementById('messageBoard'));
    }

    render() {
        if (this.state.active) {
            return /*#__PURE__*/React.createElement("a", {
                className: "active",
                "data-toggle": "pill",
                role: "pill"
            }, /*#__PURE__*/React.createElement("div", {
                className: "iconPadding"
            }, /*#__PURE__*/React.createElement("div", {
                className: "iconTrigger"
            }, /*#__PURE__*/React.createElement("img", {
                src: "/images/MainIcon.png",
                className: "groupIconContainer",
                onClick: this.clickSelfData.bind(this),
                style: {
                    backgroundColor: "yellow"
                }
            }))));
        } else {
            return /*#__PURE__*/React.createElement("a", {
                "data-toggle": "pill",
                role: "pill"
            }, /*#__PURE__*/React.createElement("div", {
                className: "iconPadding"
            }, /*#__PURE__*/React.createElement("div", {
                className: "iconTrigger"
            }, /*#__PURE__*/React.createElement("img", {
                src: "/images/MainIcon.png",
                className: "groupIconContainer",
                onClick: this.clickSelfData.bind(this),
                style: {
                    backgroundColor: "yellow"
                }
            }))));
        }
    }

}

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate(nextProps) {
        return true;
    }

    componentDidMount() {
        ReactDOM.render( /*#__PURE__*/React.createElement(FriendList, {
            data: friendList
        }), document.getElementById("friendList"));
        ReactDOM.render( /*#__PURE__*/React.createElement(UserSetting, null), document.getElementById("friendMessageAndUserSetting"));
    }

    componentDidUpdate() {
        ReactDOM.render( /*#__PURE__*/React.createElement(FriendList, {
            data: friendList
        }), document.getElementById("friendList"));
        ReactDOM.render( /*#__PURE__*/React.createElement(UserSetting, null), document.getElementById("friendMessageAndUserSetting"));
    }

    render() {
        groupChatingID = 0;
        friendChatingID = 0;
        return /*#__PURE__*/React.createElement("div", {
            className: "flexRow",
            style: {
                height: "100%"
            }
        }, /*#__PURE__*/React.createElement("div", {
            className: "groupListAndHomePageContainer flexColumn",
            style: {
                borderRight: "1px solid black"
            }
        }, /*#__PURE__*/React.createElement("div", {
            style: {
                flexBasis: "20px",
                color: "#ADADAD",
                margin: "auto",
                textAlign: "center"
            }
        }, "friend List"), /*#__PURE__*/React.createElement("div", {
            className: "groupList"
        }, /*#__PURE__*/React.createElement("ul", {
            className: "nav",
            id: "friendList"
        }))), /*#__PURE__*/React.createElement("div", {
            className: "messageBoard",
            style: {
                borderBottom: "none"
            },
            id: "friendMessageAndUserSetting"
        }));
    }

}

class UserSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friendName: "",
            groupName: ""
        };
        this.texting = this.texting.bind(this);
        this.send = this.send.bind(this);
    }

    texting(event, type) {
        this.setState({
            [type]: event.target.value
        });
    }

    send(event, type) {
        if (type === "friendName" && this.state.friendName !== "") {
            var xhr_inviteFriend = new XMLHttpRequest();
            xhr_inviteFriend.open("POST", "file/friendInvite/" + this.state.friendName);

            xhr_inviteFriend.onload = function () {
                var onLoadMessage = JSON.parse(xhr_inviteFriend.responseText);

                if (onLoadMessage.messageName === "snedFriendInvite") {
                    this.setState({
                        [type]: ""
                    });
                }
            }.bind(this);

            xhr_inviteFriend.send();
        } else if (type === "groupName" && this.state.groupName !== "") {
            var xhr_creatGroup = new XMLHttpRequest();
            xhr_creatGroup.open("POST", "file/createGroup/" + this.state.groupName);

            xhr_creatGroup.onload = function () {
                var onLoadMessage = JSON.parse(xhr_creatGroup.responseText);

                if (onLoadMessage.messageName === "createGroup") {
                    this.setState({
                        [type]: ""
                    });
                    getGroup();
                }
            }.bind(this);

            xhr_creatGroup.send();
        }
    }

    shouldComponentUpdate(nextProps) {
        return true;
    }

    componentDidMount() { }

    componentDidUpdate() { }

    render() {
        return /*#__PURE__*/React.createElement("div", {
            className: "flexColumn ",
            style: {
                height: "100%",
                margin: "auto",
                textAlign: "center",
                width: "450px"
            }
        }, /*#__PURE__*/React.createElement("div", {
            style: {
                margin: "auto",
                width: "100%",
                height: "100%",
                maxHeight: "300px"
            }
        }, /*#__PURE__*/React.createElement("div", {
            style: {
                flexBasis: "0px",
                flexGrow: "1"
            }
        }, /*#__PURE__*/React.createElement("div", {
            className: "flexRow",
            style: {
                height: "100%"
            }
        }, /*#__PURE__*/React.createElement("div", {
            className: "iconPadding",
            style: {
                flexBasis: "0px",
                flexGrow: "1"
            }
        }, /*#__PURE__*/React.createElement("img", {
            src: "/images/MainIcon.png",
            className: "groupIconContainer",
            style: {
                height: "150px",
                backgroundColor: "yellow"
            }
        })))), /*#__PURE__*/React.createElement("div", {
            style: {
                flexBasis: "50px",
                width: "100%"
            }
        }, /*#__PURE__*/React.createElement("div", {
            className: "flexRow",
            style: {
                height: "100%"
            }
        }, /*#__PURE__*/React.createElement("div", {
            className: "inputContainer",
            style: {
                flexBasis: "0px",
                flexGrow: "0.7"
            }
        }, /*#__PURE__*/React.createElement("input", {
            type: "text",
            className: "form-control input text-white",
            value: this.state.friendName,
            onChange: e => this.texting(e, "friendName")
        })), /*#__PURE__*/React.createElement("div", {
            className: "sendContainer",
            style: {
                flexBasis: "0px",
                flexGrow: "0.3"
            }
        }, /*#__PURE__*/React.createElement("button", {
            type: "button",
            className: "btn btn-dark",
            onClick: e => this.send(e, "friendName")
        }, "add friend")))), /*#__PURE__*/React.createElement("div", {
            style: {
                flexBasis: "50px",
                width: "100%"
            }
        }, /*#__PURE__*/React.createElement("div", {
            className: "flexRow",
            style: {
                height: "100%"
            }
        }, /*#__PURE__*/React.createElement("div", {
            className: "inputContainer",
            style: {
                flexBasis: "0px",
                flexGrow: "0.7"
            }
        }, /*#__PURE__*/React.createElement("input", {
            type: "text",
            className: "form-control input text-white",
            value: this.state.groupName,
            onChange: e => this.texting(e, "groupName")
        })), /*#__PURE__*/React.createElement("div", {
            className: "sendContainer",
            style: {
                flexBasis: "0px",
                flexGrow: "0.3"
            }
        }, /*#__PURE__*/React.createElement("button", {
            type: "button",
            className: "btn btn-dark",
            onClick: e => this.send(e, "groupName")
        }, "create group"))))));
    }

}

class FriendList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friendList: this.props.data,
            active: 0
        };
    }

    shouldComponentUpdate(nextProps) {
        this.state.friendList = nextProps.data;
        return true;
    }

    render() {
        const fiend = [];

        if (this.state.active === 1) {
            this.state.active = 0;
        } else {
            this.state.active = 1;
        }

        for (var num = 0; num < this.state.friendList.length; num++) {
            fiend.push( /*#__PURE__*/React.createElement("li", {
                key: this.state.friendList[num].friendID
            }, /*#__PURE__*/React.createElement("a", {
                className: this.state.active,
                "data-toggle": "pill",
                role: "pill"
            }, /*#__PURE__*/React.createElement("div", {
                className: "iconPadding"
            }, /*#__PURE__*/React.createElement("div", {
                className: "iconTrigger"
            }, /*#__PURE__*/React.createElement("img", {
                src: "/images/MainIcon.png",
                className: "groupIconContainer",
                name: this.state.friendList[num].friendName,
                id: this.state.friendList[num].friendID,
                onClick: e => this.weclick(e),
                style: {
                    backgroundColor: "yellow"
                }
            }))))));
        }

        return fiend;
    }

    weclick(event) {
        var friendName = event.target.name;
        var friendID = event.target.id;
        var xhr_feindOldMessage = new XMLHttpRequest();
        xhr_feindOldMessage.open("GET", "file/oldFriendMessage/" + friendID + "/0");

        xhr_feindOldMessage.onload = function () {
            var onLoadMessage = JSON.parse(xhr_feindOldMessage.responseText);

            if (onLoadMessage.messageName === "getOldFriendMessage") {
                groupMessageActive = 0;
                friendMessageActive = 1;
                friendChatingID = friendID;
                ReactDOM.render( /*#__PURE__*/React.createElement(FriendMessage, {
                    data: onLoadMessage.data,
                    reset: 1,
                    id: friendID
                }), document.getElementById("friendMessageAndUserSetting"));
                ReactDOM.render( /*#__PURE__*/React.createElement(SetBar, {
                    data: friendName,
                    input: 0,
                    page: "friendPage",
                    friendID: friendID
                }), document.getElementById("setBar"));
                ReactDOM.render( /*#__PURE__*/React.createElement(SelfData, {
                    data: 0
                }), document.getElementById('selfData'));
            }
        };

        xhr_feindOldMessage.send();
    }

}

class FriendMessage extends React.Component {
    constructor(props) {
        super(props);

        _defineProperty(this, "message", []);

        _defineProperty(this, "messageCount", 0);

        this.state = {
            message: this.props.data,
            reset: this.props.reset,
            id: this.props.id
        };
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.data !== undefined) this.state.message = nextProps.data;
        if (nextProps.reset !== undefined) this.state.reset = nextProps.reset;
        if (nextProps.id !== undefined) this.state.id = nextProps.id;

        if (this.state.id !== friendChatingID) {
            return false;
        }

        return true;
    }

    render() {
        if (this.state.reset === 1) {
            this.message = [];
            this.messageCount = 0;
        }

        for (var num = 0; num < this.state.message.length; num++) {
            if (this.state.message[num].fromUserName === userData["userName"]) {
                this.message.push( /*#__PURE__*/React.createElement("div", {
                    className: "messageContainer flexRow ",
                    key: this.messageCount++,
                    style: {
                        textAlign: "right"
                    }
                }, /*#__PURE__*/React.createElement("div", {
                    className: "messageFromAndArtical"
                }, /*#__PURE__*/React.createElement("div", {
                    className: "messageFrom"
                }, this.state.message[num].fromUserName), /*#__PURE__*/React.createElement("div", {
                    className: "messageArtical"
                }, this.state.message[num].message)), /*#__PURE__*/React.createElement("div", {
                    className: "messageImgContaniner flexColumn"
                }, /*#__PURE__*/React.createElement("img", {
                    src: "/images/MainIcon.png",
                    className: "messageImg",
                    style: {
                        backgroundColor: "yellow"
                    }
                }))));
            } else {
                this.message.push( /*#__PURE__*/React.createElement("div", {
                    className: "messageContainer flexRow",
                    key: this.messageCount++
                }, /*#__PURE__*/React.createElement("div", {
                    className: "messageImgContaniner flexColumn"
                }, /*#__PURE__*/React.createElement("img", {
                    src: "/images/MainIcon.png",
                    className: "messageImg",
                    style: {
                        backgroundColor: "yellow"
                    }
                })), /*#__PURE__*/React.createElement("div", {
                    className: "messageFromAndArtical"
                }, /*#__PURE__*/React.createElement("div", {
                    className: "messageFrom"
                }, this.state.message[num].fromUserName), /*#__PURE__*/React.createElement("div", {
                    className: "messageArtical"
                }, this.state.message[num].message))));
            }
        }

        return this.message;
    }

}

class MessageSender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            page: this.props.page,
            friendID: this.props.friendID,
            roomID: this.props.roomID
        };
        this.texting = this.texting.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        this.state.roomID = nextProps.roomID;
        this.state.friendID = nextProps.friendID;
        this.state.page = nextProps.page;
        return true;
    }

    render() {
        switch (this.state.page) {
            case "groupPage":
                return /*#__PURE__*/React.createElement("div", {
                    className: "flexRow",
                    style: {
                        height: "100%"
                    }
                }, /*#__PURE__*/React.createElement("div", {
                    className: "messageInputContainer"
                }, /*#__PURE__*/React.createElement("input", {
                    type: "text",
                    className: "form-control input text-white",
                    id: this.state.roomID,
                    value: this.state.message,
                    onChange: this.texting
                })), /*#__PURE__*/React.createElement("div", {
                    className: "MessageSendContainer"
                }, /*#__PURE__*/React.createElement("button", {
                    type: "button",
                    className: "btn btn-dark",
                    onClick: e => this.send(e, this.state.roomID)
                }, "send")));
                break;

            case "homePage":
                return /*#__PURE__*/React.createElement("div", {
                    className: "flexRow",
                    style: {
                        height: "100%"
                    }
                }, /*#__PURE__*/React.createElement("div", {
                    className: "messageInputContainer"
                }, /*#__PURE__*/React.createElement("input", {
                    type: "text",
                    className: "form-control input text-white",
                    id: "homePage",
                    value: this.state.message,
                    onChange: this.texting
                })), /*#__PURE__*/React.createElement("div", {
                    className: "MessageSendContainer"
                }, /*#__PURE__*/React.createElement("button", {
                    type: "button",
                    className: "btn btn-dark"
                }, "send")));
                break;

            case "friendPage":
                return /*#__PURE__*/React.createElement("div", {
                    className: "flexRow",
                    style: {
                        height: "100%"
                    }
                }, /*#__PURE__*/React.createElement("div", {
                    className: "messageInputContainer"
                }, /*#__PURE__*/React.createElement("input", {
                    type: "text",
                    className: "form-control input text-white",
                    id: this.state.friendID,
                    value: this.state.message,
                    onChange: this.texting
                })), /*#__PURE__*/React.createElement("div", {
                    className: "MessageSendContainer"
                }, /*#__PURE__*/React.createElement("button", {
                    type: "button",
                    className: "btn btn-dark",
                    onClick: e => this.send(e, this.state.friendID)
                }, "send")));
                break;

            default:
                return /*#__PURE__*/React.createElement("div", {
                    className: "flexRow",
                    style: {
                        height: "100%"
                    }
                }, /*#__PURE__*/React.createElement("div", {
                    className: "messageInputContainer"
                }, /*#__PURE__*/React.createElement("input", {
                    type: "text",
                    className: "form-control input text-white",
                    id: "homePage",
                    value: this.state.message,
                    onChange: this.texting
                })), /*#__PURE__*/React.createElement("div", {
                    className: "MessageSendContainer"
                }, /*#__PURE__*/React.createElement("button", {
                    type: "button",
                    className: "btn btn-dark"
                }, "send")));
                break;
        }
    }

    texting() {
        this.setState({
            ["message"]: event.target.value
        });
    }

    send(event, ID) {
        switch (this.state.page) {
            case "groupPage":
                var webSocketList = {};
                webSocketList["messageName"] = "groupMessage";
                var dataPackage = {};
                dataPackage["message"] = this.state.message;
                dataPackage["groupID"] = ID;
                webSocketList["data"] = dataPackage;
                sendWebSocket(webSocketList);
                break;

            case "friendPage":
                var webSocketList = {};
                webSocketList["messageName"] = "friendMessage";
                var dataPackage = {};
                dataPackage["message"] = this.state.message;
                dataPackage["friendID"] = ID;
                webSocketList["data"] = dataPackage;
                sendWebSocket(webSocketList);
                break;

            default:
                console.log("homePage");
                break;
        }

        this.setState({
            ["message"]: ""
        });
    }

}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('mainPage'));