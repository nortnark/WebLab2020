class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.user };
        this.onClickDel = this.onClickDel.bind(this);
        this.onClickEd = this.onClickEd.bind(this);
    }
    onClickDel(e) {
        this.props.onRemove(this.state.data);
    }
    onClickEd(e) {
        this.props.onEdit(this.state.data);
    }
    render() {
        return <div>
            <p><b>{this.state.data.name}</b></p>
            <p>Возраст {this.state.data.age}</p>
            <p><button onClick={this.onClickDel}>Удалить</button></p>
            <p><button onClick={this.onClickEd}>Изменить</button></p>
        </div>;
    }
}

class UserForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: "", age: 0 };

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onAgeChange = this.onAgeChange.bind(this);
    }
    onNameChange(e) {
        this.setState({ name: e.target.value });
    }
    onAgeChange(e) {
        this.setState({ age: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        var userName = this.state.name.trim();
        var userAge = this.state.age;
        if (!userName || userAge <= 0) {
            return;
        }
        this.props.onUserSubmit({ name: userName, age: userAge });
        this.setState({ name: "", age: 0 });
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <p>
                    <input type="text"
                        placeholder="Имя пользователя"
                        value={this.state.name}
                        onChange={this.onNameChange} />
                </p>
                <p>
                    <input type="number"
                        placeholder="Возраст"
                        value={this.state.age}
                        onChange={this.onAgeChange} />
                </p>
                <input type="submit" value="Сохранить" />
            </form>
        );
    }
}

class UsersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { users: [] };

        this.onAddUser = this.onAddUser.bind(this);
        this.onRemoveUser = this.onRemoveUser.bind(this);
        this.onEditUser = this.onEditUser.bind(this);

    }
    // загрузка данных
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ users: data });
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }
    // добавление объекта
    onAddUser(user) {
        if (user) {
            const data = new FormData();
            data.append("name", user.name);
            data.append("age", parseInt(user.age, 10));
            var xhr = new XMLHttpRequest();

            xhr.open("post", this.props.apiUrl, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }
    // удаление объекта
    onRemoveUser(user) {

        if (user) {
            var url = this.props.apiUrl + "/" + user.id;

            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send();
        }
    }
    // изменение объекта
    //onEditUser(user) {

    //    if (user) {
    //        const data = new FormData();
    //        data.append("name", user.name);
    //        data.append("age", parseInt(user.age, 10));
    //        var xhr = new XMLHttpRequest();

    //        xhr.open("put", this.props.apiUrl, true);
    //        xhr.onload = function () {
    //            if (xhr.status === 200) {
    //                this.loadData();
    //            }
    //        }.bind(this);
    //        xhr.send(data);
    //    }
    //}
    
    render() {

        var remove = this.onRemoveUser;
        var edit = this.onEditUser;
        return <div>
            <UserForm onUserSubmit={this.onAddUser} />
            <h2>Список пользователей</h2>
            <div>
                {
                    this.state.users.map(function (user) {

                        return <User key={user.id} user={user} onRemove={remove} onEdit={edit} />
                    })
                }
            </div>
        </div>;
    }
}

ReactDOM.render(
    <UsersList apiUrl="/api/users" />,
    document.getElementById("content")
);