import React, { Component } from "react";
import "./style.css";


var wrapStyle = {
  background: "#fff",
}

var formStyle = {
  padding: "50px",
  paddingTop: "30px",
  paddingBottom: "30px",
  width: "100%"
}

var selectStyle = {
  border: "none",
  width: "100%"
}

var buttonStyle = {
  display: "block",
  margin: "0 auto",
  marginTop: "1rem",
  marginBottom: "2rem",
  backgroundColor: "#00AD5F",
  fontFamily: "Orbitron",
  fontSize: "12px",
  height: "50px",
  color: "white",
  background: "green"
}

var h4Style = {
  color: "green",
  paddingTop: "2rem",
}

class ExecuteOrders extends Component {
  state = {
    quantity: "",
    stock: "",
    side: ""
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleOrderSubmit = async event => {
    event.preventDefault();
    if (this.state.stock && this.state.quantity && this.state.side) {
      const ordersBody = {
        qty: this.state.quantity,
        side: this.state.side,
        symbol: this.state.stock,
        type: 'market',
        time_in_force: 'day'
      }
      const ordersURL = `https://paper-api.alpaca.markets/v2/orders`;
      const getOrders = await fetch(ordersURL, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "APCA-API-KEY-ID": "PKNI07BAO6K8Y3JXZT1G",
          "APCA-API-SECRET-KEY": "Hl59Yy66hxNBPMCjNJm7bZ/KcE3iz58VQKHfyzRk"
        },
        body: JSON.stringify(ordersBody)
      });
      const ordersResponse = await getOrders.json();
      console.log('ordersResponse', ordersResponse);
      alert("Order Submitted");
      setTimeout(function () {
            window.location.reload(1);
          }, 500);

    }
  };

  render() {
    return (
      <div >
        <div style={wrapStyle}>
          <h4 className="text-center" style={h4Style}>Execute Trades</h4>
          <div className="row">
            <form style={formStyle}>
              <div className="col-4" style={{ float: "left" }}>
                <label className="label-input50">Stock Symbol</label>
                <div className="wrap-input100">
                  <input
                    className="input50"
                    name="stock"
                    value={(this.state.stock).toUpperCase()}
                    onChange={this.handleInputChange}
                    placeholder="Ex: AAPL"
                  />
                </div>
              </div>
              <div className="col-4" style={{ float: "left" }}>
                <label className="label-input50">Number of Shares</label>
                <div className="wrap-input100">
                  <input
                    className="input50"
                    name="quantity"
                    value={this.state.quantity}
                    onChange={this.handleInputChange}
                    placeholder="Ex: 3"
                  />
                </div>
              </div>
              <div className="col-4" style={{ float: "left" }}>
                <label className="label-input50" for="first-name">Trade Type</label>
                <div className="wrap-input100">
                  <select
                    style={selectStyle}
                    name="side"
                    value={this.state.side}
                    onChange={this.handleInputChange}
                  >
                    <option selected>Ex: Buy or Sell</option>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div className="row">
            <div className="col-12" style={{ float: "none" }}>
              <button
                style={buttonStyle}
                onClick={this.handleOrderSubmit}
                type="success"
                className="btn rounded-0"
              >EXECUTE TRADE</button>
            </div>
          </div>
        </div>
      </div>


    )
  }
}

export default ExecuteOrders;
