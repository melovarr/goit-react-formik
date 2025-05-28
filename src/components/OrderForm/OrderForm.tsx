import { useId } from "react";
import { Formik, Form, Field } from "formik";
import css from "./OrderForm.module.css";

export default function OrderForm() {
  const fieldId = useId();

  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form className={css.form}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Client Info</legend>

          <label className={css.label} htmlFor={`${fieldId}-username`}>
            Name
          </label>
          <Field
            className={css.field}
            type="text"
            name="username"
            id={`${fieldId}-username`}
          />

          <label className={css.label} htmlFor={`${fieldId}-email`}>
            Email
          </label>
          <Field
            className={css.field}
            type="email"
            name="email"
            id={`${fieldId}-email`}
          />
        </fieldset>

        <button className={css.btn} type="submit">
          Place order
        </button>
      </Form>
    </Formik>
  );
}
