import React from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route
} from "react-router-dom";
import "./App.css";

const { REACT_APP_API: API } = process.env;

class PostForm extends React.Component {
  render() {
    return (
      <form>
        <div>
          <label>Title</label>
          <input />
        </div>
        <div>
          <label>Body</label>
          <textarea></textarea>
        </div>
        <button>Publish</button>
      </form>
    );
  }
}

class PostsPage extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      posts: []
    };
  }

  async componentDidMount() {
    const response = await fetch(`${API}/api/posts`);
    const posts = await response.json();
    this.setState({ posts });
  }

  render() {
    return (
      <div>
        <h1>Posts</h1>
        <ul>
          {this.state.posts.map(post => {
            return (
              <li key={post.id}>
                <NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <h1>My Blog</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/" exact={true}>
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink to="/posts/write">Write Post</NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact={true} component={PostsPage} />
          <Route path="/posts/write" component={PostForm} />
        </Switch>
      </Router>
    );
  }
}
