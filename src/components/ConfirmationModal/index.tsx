import './ConfirmationModal.scss'
import React from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaInfoCircle,
} from "react-icons/fa";

type VariantType = "success" | "warning" | "danger" | "info";

type ConfirmationModalProps = {
  show: boolean;
  title?: string;
  message?: JSX.Element|string;
  onConfirm: () => void;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: VariantType;
};

const variantConfig: Record<
  VariantType,
  { icon: JSX.Element; headerClass: string; btnClass: string }
> = {
  success: {
    icon: <FaCheckCircle className="me-2 text-success" />,
    headerClass: "bg-light border-success",
    btnClass: "btn-success",
  },
  warning: {
    icon: <FaExclamationTriangle className="me-2 text-warning" />,
    headerClass: "bg-light border-warning",
    btnClass: "btn-warning",
  },
  danger: {
    icon: <FaTimesCircle className="me-2 text-danger" />,
    headerClass: "bg-light border-danger",
    btnClass: "btn-danger",
  },
  info: {
    icon: <FaInfoCircle className="me-2 text-info" />,
    headerClass: "bg-light border-info",
    btnClass: "btn-info",
  },
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  title = "Confirmation",
  message = "Are you sure you want to proceed?",
  onConfirm,
  onClose,
  confirmText = "Yes",
  cancelText = "Cancel",
  variant = "info",
}) => {
  if (!show) return null;

  const { icon, headerClass, btnClass } = variantConfig[variant];

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content confirmation-modal">
          <div className={`modal-header ${headerClass}`}>
            <h5 className="modal-title d-flex align-items-center">
              {icon}
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {message}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              {cancelText}
            </button>
            <button className={`btn ${btnClass}`} onClick={onConfirm}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
