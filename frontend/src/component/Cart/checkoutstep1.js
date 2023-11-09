import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./CheckoutSteps.css";
const Checkoutstep1 = ({ activeStep }) => {
    const steps = [
        {
          label: <Typography>Order in processing</Typography>,
          icon: <i class="fa-solid fa-box-open"></i>,
        },
        {
          label: <Typography>Shipping lable Generated</Typography>,
          icon: <i class="fa-solid fa-box"></i>,
        },
        {
          label: <Typography>Shipped</Typography>,
          icon: <i class="fa-solid fa-warehouse"></i>,
        },
        {
          label: <Typography>In Transit</Typography>,
          icon: <i class="fa-solid fa-truck-fast"></i>,
        },
        {
          label: <Typography>Out For Delivery</Typography>,
          icon: <i class="fa-solid fa-people-carry-box"></i>,
        },
        {
            label: <Typography>Delivered</Typography>,
            icon: <i class="fa-solid fa-door-open"></i>,
          },
      ];
    
      const stepStyles = {
        boxSizing: "border-box",
      };
    
      return (
        <Fragment>
          <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
            {steps.map((item, index) => (
              <Step
                key={index}
                active={activeStep === index ? true : false}
                completed={activeStep >= index ? true : false}
              >
                <StepLabel
                  style={{
                    color: activeStep >= index ? "orange" : "rgba(0, 0, 0, 0.649)",
                  }}
                  icon={item.icon}
                >
                  {item.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Fragment>
      );
    };

export default Checkoutstep1
