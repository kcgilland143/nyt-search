import React, { Component } from "react";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import searchAPI from "../../utils/searchAPI"
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Article from "../../components/Article";

class SearchArticles extends Component {
  state = {
    articles: [],
    title: "",
    startDate: "",
    endDate: ""
  };

  searchArticles = (query) => {
    searchAPI.getArticles(query)
    .then(res => {
      console.log(res)
      this.setState({ articles: res.data || [], title: "", startDate: "", endDate: "" })
    })
    .catch(err => console.log(err));
  };

  saveArticle = id => {
    const article = this.state.articles.find(article => article._id === id)
    console.log(article)
    API.saveArticle(article)
      .then(res => console.log(res))
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
          <Col size="md-6">
            <Jumbotron>
              <h1>Search for Articles!</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.startDate}
                onChange={this.handleInputChange}
                name="startDate"
                placeholder="startDate (Optional)"
              />
              <Input
                value={this.state.endDate}
                onChange={this.handleInputChange}
                name="endDate"
                placeholder="endDate (Optional)"
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search Articles
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Article
                      id={article._id} 
                      headline={article.headline} 
                      byline={article.byline} 
                      snippet={article.snippet}
                      >
                      <SaveBtn onClick={() => this.saveArticle(article._id)} />
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

export default SearchArticles;
