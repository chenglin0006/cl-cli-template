import React, { useState, useEffect } from 'react';
function ProfilePageFunction(props: any) {
    console.log(props)
    const showMessage = () => {
      alert('Followed ' + props.user.name);
    };
  
    const handleClick = () => {
      setTimeout(showMessage, 3000);
    };
  
    return (
      <button onClick={handleClick}>Follow{props.user.name}</button>
    );
}
interface Props { user: any }
interface State {
    name: any
}
class ProfilePageClass extends React.Component<Props, State> {
    constructor(props: Props){
        super(props)
        this.state = {
            name: ''
        }
    }
    showMessage = ():void => {
      alert('Followed ' + this.props.user.name);
    };
  
    handleClick = () => {
      setTimeout(this.showMessage, 3000);
    };
  
    render() {
      return <button onClick={this.handleClick}>Follow{this.props.user.name}</button>;
    }
}


function Example() {
    const [user, setUser] = useState('Dan')
    const [obj, setObj] = useState({name: 'Dan'})
    useEffect(() => {
        setObj({
            name: user
        })
    }, [user])
    return (
        <div>
            <label>
            <b>Choose profile to view: </b>
            <select
                value={user}
                onChange={e => setUser( e.target.value)}
            >
                <option value="Dan">Dan</option>
                <option value="Sophie">Sophie</option>
                <option value="Sunil">Sunil</option>
            </select>
            </label>
            <h1>Welcome to {user}’s profile!</h1>
            <p>
            <ProfilePageFunction user={obj} />
            <b> (function)</b>
            </p>
            <p>
            <ProfilePageClass user={obj} />
            <b> (class)</b>
            </p>
            <p>Can you spot the difference in the behavior?</p>
      </div>
    );
}
export default Example