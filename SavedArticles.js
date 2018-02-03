import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import searchAPI from "../../utils/searchAPI"
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Article from "../../components/Article";

class SavedArticles extends Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    this.loadArticles()
  }

  loadArticles = () => {
    API.getArticles()
    .then(res => {
      this.setState({ articles: res.data || []})
    })
    .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => {
        const articles = this.state.articles
          .filter(article => !(article._id === id))
        this.setState({articles: articles})
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      let query = { q:this.state.title }
      if (this.state.startDate) {
        query['startDate'] = this.state.startDate
      }
      if (this.state.endDate) {
        query['endDate'] = this.state.endDate
      }
      this.searchArticles(query)
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12 sm-12">
            <h1>Saved Articles!</h1>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Article
                      _id={article._id} 
                      headline={article.headline} 
                      byline={article.byline} 
                      snippet={article.snippet}
                      >
                      <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                    </Article>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SavedArticles;