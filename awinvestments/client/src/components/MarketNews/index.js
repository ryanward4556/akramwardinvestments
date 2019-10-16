import React, { Component } from "react";
import NewsJumbotron from "../NewsJumbotron";
import Input from "../Input";
import Button from "../Button";
import API from "../../Utilities-News/API";
import { StockList, StockListItem } from "../StockList";
import { Container, Row, Col } from "../Grid";

class MarketNews extends Component {
  state = {
    stocks: [],
    stockSearch: ""
  };

  componentDidMount() {
    API.search("AAPL").then(res => this.setState({ stocks: res.data.data }))
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.search(this.state.stockSearch)
      .then(res => this.setState({ stocks: res.data.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <NewsJumbotron />
        <Container>
          <div class="row">
            <div class="col-12">
              <form>
                <Container>
                  <Row>
                    <div className="col-5 offset-3">
                      <Input
                        name="stockSearch"
                        value={this.state.stockSearch}
                        onChange={this.handleInputChange}
                        placeholder="Search For a Stock"
                      />
                    </div>
                    <div className="col-2">
                      <Button
                        onClick={this.handleFormSubmit}
                        type="success"
                        className="input-lg"
                      >Search</Button>
                    </div>
                  </Row>
                </Container>
              </form>
            </div>
          </div>
          <Row>
            <Col size="xs-12">
              {
                <StockList>
                  {this.state.stocks.map(stock => {
                    return (
                      <StockListItem
                        key={stock.title}
                        title={stock.title}
                        href={stock.news_url}
                        text={stock.text}
                        sentiment={stock.sentiment}
                        source={stock.source_name}
                        date={stock.date}
                        thumbnail={stock.image_url}
                      />
                    );
                  })}
                </StockList>
              }
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default MarketNews;