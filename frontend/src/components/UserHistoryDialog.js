import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { List, ListItem, ListItemText } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function UserHistoryDialog({
  history,
  dialogOpen,
  setDialogOpen,
}) {
  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={Boolean(dialogOpen)}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          User History
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <List>
            {history.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={index + 1 + ") "}
                    sx={{ m: 2, textAlign: "left" }}
                  ></ListItemText>
                  <ListItemText primary={item.product_name} />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
