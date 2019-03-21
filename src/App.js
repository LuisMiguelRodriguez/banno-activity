import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import cheerio from 'cheerio';
import axios from 'axios'

class App extends Component {

  state = {
    link: ''
  }

  clickHandler = () => {

    axios('http://www.banno.com')
      .then(({ data }) => {

        const $ = cheerio.load(data);
        const dom = $('body').html();

        // look only for alphanumeric 
        const res = dom.match(/([a-zA-z]+[\d]+)|([\d]+[a-zA-z]+)/g);
        const obj = {};

        // count repetitions of alphanumerics
        res.map(item => {

          if (obj[item] >= 0) {
            obj[item] = obj[item] + 1;

          } else {
            obj[item] = 0;
          }

        })

        // new array to hold alphanumerics count
        let newArr = [];

        for(let temp in obj){
          newArr.push({alpha: temp , count: obj[temp]})
        }

        // Organized array by count value 
        var sortedArr = newArr.sort((current, next) =>  next.count - current.count);
        console.log('== sorted array ===========')

        // Log top 3 highest count
        console.log('#1 ', sortedArr[0])
        console.log('#2 ', sortedArr[1])
        console.log('#3 ', sortedArr[3])


        // Array to hold products found on the page
        const products = [];

        $('#sub-menu').children('li').each((i, item) => {

          products.push($(item).find('span').text().trim());

        })

        console.log('Current Products Listed ', products)

      })
      .catch(err => console.log(err))


  }


  render() {
    return (
      <div className="App">
        <Button onClick={this.clickHandler} letiant="primary" size="lg" block>
          Scan
        </Button>
      </div>
    );
  }
}

export default App;
