import { confirmAlert } from "react-confirm-alert";

export const confirmAlertDelete = (name, array, setState) =>
  confirmAlert({
    title: "Подтверждение удаления",
    message: "Вы действительно хотите удалить файл?",
    buttons: [
      {
        label: "Да",
        onClick: () => {
          const updateFiles = array.filter(
            (item) => item.originalname.indexOf(name) == -1
          );
          setState(updateFiles);
        },
      },
      {
        label: "Нет",
      },
    ],
  });
