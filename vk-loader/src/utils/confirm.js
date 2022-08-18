import { confirmAlert } from "react-confirm-alert";

export const confirmAlertDelete = (id, array, setState) =>
  confirmAlert({
    title: "Подтверждение удаления",
    message: "Вы действительно хотите удалить файл?",
    buttons: [
      {
        label: "Да",
        onClick: () => {
          const updateFiles = array.filter((item) => item.rnId !== id);
          setState(updateFiles);
        },
      },
      {
        label: "Нет",
      },
    ],
  });
