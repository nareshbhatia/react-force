import React, { Fragment, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { storiesOf } from '@storybook/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { StoryDecorator } from '../stories';
import { SingleSelectField } from './SingleSelectField';

import { DateUtils } from '@react-force/date-utils';
import moment from 'moment';
import 'moment-timezone';

const { gmtOffset, tzAbbr } = DateUtils;

// Default timezone
const DefaultTz = 'America/New_York';

/**
 * Timezone
 *
 * Example:
 *   {
 *     name: 'America/New_York',
 *     label: '(GMT-04:00) America/New_York - EDT'
 *   }
 */
interface Timezone {
    name: string;
    label: string;
}

/**
 * Returns a descriptive label for the specified timezone name
 * @param tzName
 */
function getTimezoneLabel(tzName: string) {
    return `(${gmtOffset(tzName)}) ${tzName} - ${tzAbbr(tzName)}`;
}

/**
 * Returns an array of Timezones
 */
function getTimezones(): Array<Timezone> {
    return moment.tz
        .names()
        .map((name) => {
            const now = Date.now();
            const zone = moment.tz.zone(name);
            return { name, offset: zone !== null ? zone.utcOffset(now) : 0 };
        })
        .sort((a, b) =>
            a.offset === b.offset
                ? a.name.localeCompare(b.name)
                : b.offset - a.offset
        )
        .map((zone) => {
            const name = zone.name;
            return {
                name,
                label: getTimezoneLabel(name),
            };
        });
}

/**
 * Finds a timezone by name
 * @param timezones
 * @param tzName
 */
function findTimezone(
    timezones: Array<Timezone>,
    tzName: string
): Timezone | undefined {
    return timezones.find((timezone) => timezone.name === tzName);
}

const timezones = getTimezones();

const Example = () => {
    const [timezone, setTimezone] = useState<Timezone | undefined>(
        findTimezone(timezones, DefaultTz)
    );

    const validationSchema = yup.object().shape({
        timezone: yup.mixed().required('Time zone is required'),
    });

    return (
        <Fragment>
            <Formik
                initialValues={{ timezone }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    setTimezone(values.timezone);
                    actions.setSubmitting(false);
                }}
            >
                {({ resetForm }) => (
                    <Form>
                        <SingleSelectField
                            name="timezone"
                            label="Time Zone"
                            options={timezones}
                            getOptionLabel={(option: Timezone) => option.label}
                        />
                        <Box mt={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Save
                            </Button>
                            &nbsp;
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    resetForm();
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>

            {timezone !== undefined ? (
                <Box mt={6}>
                    <Typography variant="h5">{timezone.label}</Typography>
                </Box>
            ) : null}
        </Fragment>
    );
};

storiesOf('SingleSelectField', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <Example />);
