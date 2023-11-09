import React from "react";
import "./shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import { useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps.js"

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.user)

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }else if(phoneNo === String){
      alert.error("There is Some Problem here")
    }else{
      dispatch(
        saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
      );
      history.push("/order/confirm");
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    history.push("/order/confirm");
  };
  return (
    <>

      <CheckoutSteps activeStep={0} />

      <div className="containerss">
        <h1>Shipping</h1>
        <p>Please enter your shipping details.</p>
        <hr />
        <form encType="multipart/form-data" onSubmit={shippingSubmit}>
          <div className="form">
            <div className="fields fields--2">
            <label className="field">
              <span className="field__label" for="address">
                Name
              </span>
              <input
                className="field__input"
                type="text"
                id="address"
                required
                value={user.name}
              
              />
            </label>
            </div>
            <label className="field">
              <span className="field__label" for="address">
                Address
              </span>
              <input
                className="field__input"
                type="text"
                id="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <label className="field">
              <span className="field__label" for="address">
                Phone Number
              </span>
              <input
                className="field__input"
                type="number"
                
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </label>
            <label className="field">
              <span className="field__label" for="country">
                Country
              </span>
              <select
                className="field__input"
                id="country"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
               <option></option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </label>
            <div className="fields fields--3">
              <label className="field">
                <span className="field__label" for="zipcode">
                  Zip code
                </span>
                <input className="field__input"  id="zipcode"  type="number"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)} />
              </label>
              <label className="field">
                <span className="field__label" for="city">
                  City
                </span>
                <input className="field__input"  id="city"  type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}/>
              </label>

              <label className="field">
                <span className="field__label" for="state">
                  State
                </span>

                {country && (
                <select className="field__input" id="state" value={state} required onChange={(e) => setState(e.target.value)}>
                    <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                      ))}
                </select>
                )}

              </label>

            </div>
          </div>
          <input
              type="submit"
              value="Continue"
              className="button"
              disabled={state ? false : true}
            />
        </form>
        <hr />
      
      </div>
    </>
  );
};

export default Shipping;
