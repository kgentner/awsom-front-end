import React, { Fragment } from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { DebugFormik } from '../components/DebugFormik';

// studentID? global state

const secondaryFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  studentName: '',
  birthDate: '',
  anythingElse: '',
  hearAbout: '',
};

const minBirthDate = '1900-01-01';

const secondaryFormSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .email()
    .required('Required'),
  phone: Yup.string()
    .matches(
      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      'Must be a valid 10-digit phone number.'
    )
    .required('Required'),
  studentName: Yup.string().required('Required'),
  birthDate: Yup.date()
    .min(minBirthDate, 'Wow! Maybe you should be a teacher instead.')
    .max(
      new Date(),
      "That's in the future! Check the flux capacitor in your Delorean. "
    )
    .required('Required'),
});

export default class SecondaryForm extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="app__container">
          <div className="app__freetrial_description">
            <h1>We just need a few more details.</h1>
          </div>
          <Formik
            initialValues={secondaryFormValues}
            validationSchema={secondaryFormSchema}
            onSubmit={values => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
              }, 500);
            }}
          >
            {({ values, errors, touched, isSubmitting }) => (
              <Form>
                <div className="app__form">
                  <div className="app__form_item">
                    <div>First Name *</div>
                    <Field
                      name="firstName"
                      className={
                        errors.firstName && touched.firstName
                          ? 'app__form_input field-error'
                          : 'app__form_input'
                      }
                      type="text"
                    />
                    <ErrorMessage name="firstName">
                      {msg => <div className="field-error">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="app__form_item">
                    <div>Last Name *</div>
                    <Field
                      name="lastName"
                      className={
                        errors.lastName && touched.lastName
                          ? 'app__form_input field-error'
                          : 'app__form_input'
                      }
                      type="text"
                    />
                    <ErrorMessage name="lastName">
                      {msg => <div className="field-error">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="app__form_item">
                    <div>Email Address *</div>
                    <Field
                      name="email"
                      className={
                        errors.email && touched.email
                          ? 'app__form_input field-error'
                          : 'app__form_input'
                      }
                      type="text"
                    />
                    <ErrorMessage name="email">
                      {msg => <div className="field-error">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="app__form_item">
                    <div>Phone *</div>
                    <Field
                      name="phone"
                      className={
                        errors.phone && touched.phone
                          ? 'app__form_input field-error'
                          : 'app__form_input'
                      }
                      type="text"
                    />
                    <ErrorMessage name="phone">
                      {msg => <div className="field-error">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="app__form_item">
                    <div>Student Name *</div>
                    <Field
                      name="studentName"
                      className={
                        errors.studentName && touched.studentName
                          ? 'app__form_input field-error'
                          : 'app__form_input'
                      }
                      type="text"
                    />
                    <ErrorMessage name="studentName">
                      {msg => <div className="field-error">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="app__form_item">
                    <div>Student Birth Date *</div>
                    <Field
                      name="birthDate"
                      className={
                        errors.birthDate && touched.birthDate
                          ? 'app__form_input field-error'
                          : 'app__form_input'
                      }
                      type="date"
                    />
                    <ErrorMessage name="birthDate">
                      {msg => <div className="field-error">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="app__form_item">
                    <div>
                      Anything else you would like your teacher to know?
                    </div>
                    <Field
                      name="anythingElse"
                      className={
                        errors.anythingElse && touched.anythingElse
                          ? 'app__form_input field-error'
                          : 'app__form_input'
                      }
                      type="text"
                    />
                    <ErrorMessage name="anythingElse">
                      {msg => <div className="field-error">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="app__form_item">
                    <div>How did you hear about us?</div>
                    <div className="app__form_addresssub">
                      Teacher's name, friend's name, Facebook, a little bird,
                      Craigslist, Yelp, Car ads
                    </div>
                    <Field
                      name="hearAbout"
                      className={
                        errors.hearAbout && touched.hearAbout
                          ? 'app__form_input field-error'
                          : 'app__form_input'
                      }
                      type="text"
                    />
                    <ErrorMessage name="hearAbout">
                      {msg => <div className="field-error">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="app__form_container">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary "
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
                <DebugFormik />
              </Form>
            )}
          </Formik>
        </div>
      </Fragment>
    );
  }
}
