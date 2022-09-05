import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  allNotifications,
  deleteNotification,
  getUserEmail,
} from "../../redux/actions";
import { useAuth } from "../../context/authContext";
import { Avatar, Box, Button, Typography } from "@mui/material";
import "../css/empty.css";

export default function Notifications() {
  const { user } = useAuth();
  let notifications = useSelector((state) => state.allNotifications);
  const userState = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  notifications = notifications.filter(
    (e) => e.userNotificated_id === userState[0]?.id
  );
  notifications = notifications.reverse();

  useEffect(() => {
    dispatch(allNotifications());
    dispatch(getUserEmail(user?.email));
  }, [dispatch, user?.email]);

  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(deleteNotification(e.target.id));
    window.location.reload(true);
  };

  return (
    <Box
      sx={{
        width: "70%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "4%",
        }}
      >
        {notifications.length === 0 ? (
          <Box
            className="card-container"
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" mb={5}>
              Sin noticias actualmente
            </Typography>

            <Avatar
              sx={{
                width: 182,
                height: 182,
                boxShadow:
                  " rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
              }}
            >
              {
                <img
                  src="https://images.unsplash.com/photo-1505939675702-ea0ad504df86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="?"
                  width="182px"
                  height="182px"
                />
              }
            </Avatar>
          </Box>
        ) : (
          notifications.map((e) => {
            return (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  border: "solid grey 1px",
                  borderRadius: "10px",
                  margin: "1% 0px",
                }}
                key={e.id}
              >
                <Box sx={{ padding: "2%" }}>
                  <Typography sx={{ fontSize: "1.3rem" }}>
                    Notificacion de {e.userNotification?.firstName}{" "}
                  </Typography>
                  <Typography sx={{ fontSize: "1.3rem" }}>
                    {e.message}
                  </Typography>
                </Box>
                <Button
                  sx={{
                    borderRadius: "0 10px 10px 0",
                    backgroundColor: "#1F2937",
                  }}
                  variant="contained"
                  id={e.id}
                  onClick={handleOnClick}
                >
                  X
                </Button>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
}
