import React, { Component } from 'react';
import Coupon from './coupon';

class Coupons extends Component {
    render() {
        const { coupons } = this.props;

        return (
            <React.Fragment>
                <div className="row">
                    {coupons.map(coupon => (

                        <Coupon
                            key={coupon._id}
                            coupon={coupon} />


                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default Coupons;