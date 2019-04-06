import React, {Component} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class PageLayout extends Component {
  render() {
    return (
      <div>
        <Header/>
        <main>
          {this.props.children}
        </main>
        <Footer/>
      </div>
    );
  }
}

export default PageLayout;
