import React, { Fragment } from 'react';
import { freeTrialInitialPost } from 'actions';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import { DebugFormik } from '../components/DebugFormik';
import SelectExperienceLevel from '../components/SelectExperienceLevel';
import SelectHasInstrument from '../components/SelectHasInstrument';
import SelectInstrument from '../components/SelectInstrument';
import SelectMusicStyle from '../components/SelectMusicStyle';
import { federatedStates } from '../constants/federatedStates';
import { businessHours } from '../constants/businessHours';
import { businessDays } from '../constants/businessDays';

const initialFormValues = {
  instrument: '',
  musicStyle: '',
  experienceLevel: '',
  hasInstrument: '',
  addressOne: '',
  addressTwo: '',
  city: '',
  state: '',
  zip: '',
  availability: [
    {
      day: '',
      fromTime: 0,
      toTime: 0,
    },
  ],
  allergies: '',
  specialNeeds: '',
};

const initialFormSchema = Yup.object({
  instrument: Yup.string().required('Required'),
  musicStyle: Yup.string().required('Required'),
  experienceLevel: Yup.string().required('Required'),
  hasInstrument: Yup.string().required('Required'),
  addressOne: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string()
    .oneOf(federatedStates, 'Must be a valid two-letter state abbreviation.')
    .required('Required'),
  zip: Yup.string()
    .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Must be a five-number zip code.')
    .required('Required'),
  availability: Yup.array().of(
    Yup.object({
      day: Yup.string().required('Day required'),
      fromTime: Yup.string().required('Start time required'),
      toTime: Yup.string().required('End time required'),
    })
  ),
});

class FreeTrial extends React.Component {
  render() {
    console.log('props: ', this.props);
    return (
      <Fragment>
        <div className="app__container">
          <div className="app__freetrial_description">
            <h1>Let's find a great teacher in your area!</h1>
          </div>
          <Formik
            initialValues={initialFormValues}
            validationSchema={initialFormSchema}
            onSubmit={values => {
              this.props.dispatch(freeTrialInitialPost(values));
            }}
          >
            {({ values, errors, touched, isSubmitting }) => (
              <Form>
                <div className="app__form">
                  <div className="app__form_item">
                    <SelectInstrument />
                  </div>
                  <div className="app__form_item">
                    <SelectMusicStyle />
                  </div>
                  <div className="app__form_item">
                    <SelectExperienceLevel />
                  </div>
                  <div className="app__form_item">
                    <SelectHasInstrument />
                  </div>
                  <div className="app__form_item">
                    <div>Address 1 *</div>
                    <Field
                      name="addressOne"
                      className={
                        errors.addressOne && touched.addressOne
                          ? 'app__form_input field-error'
                          : 'app__form_input'
                      }
                      type="text"
                    />
                    <ErrorMessage name="addressOne">
                      {msg => <div className="field-error">{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="app__form_item">
                    <div>Address 2</div>
                    <Field
                      name="addressTwo"
                      className="app__form_input"
                      type="text"
                    />
                    <ErrorMessage name="addressTwo">
                      {msg => <div className="field-error">{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="app__form_item">
                    <div>City *</div>
                    <Field
                      name="city"
                      className={
                        errors.city && touched.city
                          ? 'app__form_input field-error'
                          : 'app__form_input'
                      }
                      type="text"
                    />
                    <ErrorMessage name="city">
                      {msg => <div className="field-error">{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="app__form_item">
                    <div>State *</div>
                    <Field
                      name="state"
                      className={
                        errors.zip && touched.zip
                          ? 'app__form_input field-error'
                          : 'app__form_input'
                      }
                      type="text"
                    />
                    <ErrorMessage name="state">
                      {msg => <div className="field-error">{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="app__form_item">
                    <div>Zip *</div>
                    <Field
                      name="zip"
                      className={
                        errors.zip && touched.zip
                          ? 'app__form_input field-error'
                          : 'app__form_input'
                      }
                      type="text"
                    />
                    <ErrorMessage name="zip">
                      {msg => <div className="field-error">{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="app__form_item">
                    <div>Availability *</div>

                    <FieldArray name="availability">
                      {({ push, remove }) => (
                        <Fragment>
                          {values.availability &&
                            values.availability.length > 0 &&
                            values.availability.map((item, index) => (
                              <div key={index}>
                                <Field
                                  component="select"
                                  name={`availability[${index}].day`}
                                  className="app__form_dropdownbox"
                                >
                                  <option value="">Select</option>
                                  {businessDays.map(element => (
                                    <option
                                      key={element.id}
                                      value={element.day}
                                    >
                                      {element.day.replace(/^\w/, c =>
                                        c.toUpperCase()
                                      )}
                                    </option>
                                  ))}
                                </Field>
                                <span />
                                <Field
                                  component="select"
                                  name={`availability[${index}].fromTime`}
                                >
                                  <option value="">From</option>
                                  {businessHours.map(element => (
                                    <option
                                      key={element.id}
                                      value={element.time}
                                    >
                                      {element.label}
                                    </option>
                                  ))}
                                </Field>
                                <span />
                                <Field
                                  component="select"
                                  name={`availability[${index}].toTime`}
                                >
                                  <option value="">To</option>
                                  {businessHours.map(element => (
                                    <option
                                      key={element.id}
                                      value={element.time}
                                    >
                                      {element.label}
                                    </option>
                                  ))}
                                </Field>

                                <button
                                  type="button"
                                  className="btn"
                                  onClick={() => remove(index)}
                                >
                                  <i className="far fa-times-circle" />
                                </button>
                                <ErrorMessage
                                  name={`availability[${index}].day`}
                                >
                                  {msg => (
                                    <div className="field-error">{msg}</div>
                                  )}
                                </ErrorMessage>
                                <ErrorMessage
                                  name={`availability[${index}].fromTime`}
                                >
                                  {msg => (
                                    <div className="field-error">{msg}</div>
                                  )}
                                </ErrorMessage>
                                <ErrorMessage
                                  name={`availability[${index}].toTime`}
                                >
                                  {msg => (
                                    <div className="field-error">{msg}</div>
                                  )}
                                </ErrorMessage>
                              </div>
                            ))}
                          <div className="app__form_container">
                            <button
                              type="button"
                              onClick={() =>
                                push({ day: '', fromTime: '', toTime: '' })
                              }
                              className="btn btn-secondary"
                            >
                              Add Time
                            </button>
                          </div>
                        </Fragment>
                      )}
                    </FieldArray>
                  </div>
                  <div className="app__form_item">
                    <div>Allergies:</div>
                    <Field
                      name="allergies"
                      className="app__form_input"
                      type="text"
                    />
                    <ErrorMessage name="allergies">
                      {msg => <div className="field-error">{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="app__form_item">
                    <div>Special Needs:</div>
                    <Field
                      name="specialNeeds"
                      className="app__form_input"
                      type="text"
                    />
                    <ErrorMessage name="specialNeeds">
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

export default connect()(FreeTrial);
