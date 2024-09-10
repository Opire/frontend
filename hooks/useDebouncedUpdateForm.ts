import { UseFormReturnType } from "@mantine/form";
import { useEffect, useMemo } from "react";
import { prepareDebounceFunction } from "../app/_utils/debounce";

const defaultDelay = 3000;

export function useDebouncedUpdateForm<T>({
  form,
  shouldUpdate,
  onUpdate,
  delay = defaultDelay,
}: {
  form: UseFormReturnType<T>;
  shouldUpdate: (formValues: T) => boolean;
  onUpdate: (formValues: T) => void;
  delay?: number;
}) {
  const debouncedOnSubmitForm = useMemo(() => {
    const [debouncedFn] = prepareDebounceFunction(onSubmitForm, delay);

    return debouncedFn;
  }, []);

  useEffect(() => {
    form.validate();
    debouncedOnSubmitForm(form, shouldUpdate, onUpdate);
  }, [form.values]);
}

function isFormValid(form: UseFormReturnType<unknown>): boolean {
  const { hasErrors } = form.validate();

  return !hasErrors;
}

function onSubmitForm(
  form: UseFormReturnType<unknown>,
  shouldUpdate: (formValues: unknown) => boolean,
  onUpdate: (formValues: unknown) => void
) {
  if (!isFormValid(form)) {
    return;
  }

  if (!shouldUpdate(form.values)) {
    return;
  }

  onUpdate(form.values);
}