import React from "react";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import NextLink from "next/link";
import userimg from "../../../assets/images/users/user2.jpg";
import {
  Box,
  Menu,
  Typography,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";
const ProfileDD = ({ data }) => {
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  
  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <Box display="flex" alignItems="center">
          <Image
            src={userimg}
            alt={userimg}
            width="30"
            height="30"
            className="roundedCircle"
          />
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <Typography
              color="textSecondary"
              variant="h5"
              fontWeight="400"
              sx={{ ml: 1 }}
            >
              Hi,
            </Typography>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                ml: 1,
              }}
            >
              {data.firstname}
            </Typography>
            <FeatherIcon icon="chevron-down" width="20" height="20" />
          </Box>
        </Box>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={{
          "& .MuiMenu-paper": {
            width: "385px",
            right: 0,
            top: "70px !important",
          },
          "& .MuiList-padding": {
            p: "30px",
          },
        }}
      >
        <Box>
          <Box
            sx={{
              mb: 1,
            }}
          >
            <Box display="flex" alignItems="center">
              <Typography variant="h4" fontWeight="500">
                User Profile
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              pb: 3,
              mt: 3,
            }}
          >
            <Box display="flex" alignItems="center">
              <Image
                width="90"
                height="90"
                src={userimg}
                alt={userimg}
                className="roundedCircle"
              />
              <Box
                sx={{
                  ml: 2,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    lineHeight: "1.235",
                  }}
                >
                  {data && data.firstname ? data.firstname : ""} {data && data.lastname ? data.lastname : ""}
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight="400">
                  {data && data.acctype ? data.acctype : 'Unknown Type'}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Typography
                    color="textSecondary"
                    display="flex"
                    alignItems="center"
                    sx={{
                      color: (theme) => theme.palette.grey.A200,
                      mr: 1,
                    }}
                  >
                    <FeatherIcon icon="mail" width="18" />
                  </Typography>
                  <Typography color="textSecondary" variant="h6">
                    {data && data.email ? data.email : "Email Unknown"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider
            style={{
              marginTop: 0,
              marginBottom: 0,
            }}
          />

          <Box>
            <MenuItem
              sx={{
                pt: 3,
                pb: 3,
              }}
            >
              <Box display="flex" alignItems="center">
                <Button
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.light,
                    color: (theme) => theme.palette.primary.main,
                    boxShadow: "none",
                    minWidth: "50px",
                    width: "45px",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                >
                  <FeatherIcon icon="dollar-sign" width="18" height="18" />
                </Button>
                <Box
                  sx={{
                    ml: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      lineHeight: "1.235",
                    }}
                  >
                    My Profile
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                  >
                    Account Settings
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            <Divider
              style={{
                marginTop: 0,
                marginBottom: 0,
              }}
            />
            <MenuItem
              sx={{
                pt: 3,
                pb: 3,
              }}
            >
              <Box display="flex" alignItems="center">
                <Button
                  sx={{
                    backgroundColor: (theme) => theme.palette.error.light,
                    color: (theme) => theme.palette.error.main,
                    boxShadow: "none",
                    minWidth: "50px",
                    width: "45px",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                >
                  <FeatherIcon icon="credit-card" width="18" height="18" />
                </Button>
                <Box
                  sx={{
                    ml: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      lineHeight: "1.235",
                    }}
                  >
                    My Tasks
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                  >
                    To-do and Daily Tasks
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
          </Box>
          <NextLink href="/authentication/login">
            <Button
              sx={{
                mt: 2,
                display: "block",
                width: "100%",
              }}
              variant="contained"
              color="primary"
            >
              Logout
            </Button>
          </NextLink>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileDD;
