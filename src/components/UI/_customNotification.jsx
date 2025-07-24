export default function _customNotification(addToast, content, color) {
  addToast(content, {
    appearance: color || "success",
    autoDismiss: true,
  });
}
