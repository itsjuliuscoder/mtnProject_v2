import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../../../styles/Component.module.css";

export default function SuccessToaster ({ title }){
  toast.success(<p className={ styles.toaster__content}>{ title }</p> ,  {
    toastId: 'oleefe__toaster__success',
  })
  return (
    <ToastContainer icon={true} />
  );
}