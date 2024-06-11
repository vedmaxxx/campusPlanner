import { useFetching } from "./useFetching";

// функция, вызывающая все асинх функции для подгрузки групп, семестра, факультета, кафедры
// формирует единую ошибку, если хотя бы один запрос неуспешен - возвращает ошибку
// иначе просто делает все fetch-и и засовывает в mobx-сторы
export const useFormByGroupFetching = (callback) => {
  const [error, setError] = useState(null);
  const [fetchGroups, isGroupsLoading, groupError] = useFetching(callback);

  return [fetchGroups, isGroupsLoading, groupError];
};
