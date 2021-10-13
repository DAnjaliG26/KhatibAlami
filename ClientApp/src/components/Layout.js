import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

  render () {
    return (
        <div>
            <NavMenu Admin={this.props.Admin} />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
