import { expect, test } from 'vitest';
import { getFutureDate } from '../tests/utils/get-future-date';
import { Appointment } from './appointment';
test('create an appointment', () => {
    const startsAt = getFutureDate('2022-08-10');
    const endsAt = getFutureDate('2022-08-11');
    endsAt.setDate(endsAt.getDate() + 1);
    const appointment = new Appointment({
        customer: 'John Doe',
        startsAt,
        endsAt
    });
    expect(appointment).toBeInstanceOf(Appointment);
    expect(appointment.costumer).toEqual('John Doe');
});
test('cannot create an appointment with and date before start date'), () => {
    const startsAt = getFutureDate('2022-08-09');
    const endsAt = getFutureDate('2022-08-10');
    expect(() => {
        return new Appointment({
            customer: 'John doe',
            startsAt,
            endsAt,
        });
    }).toThrow();
};
test('cannot create an appointment with start date before now'), () => {
    const startsAt = new Date();
    const endsAt = new Date();
    startsAt.setDate(startsAt.getDate() + 2);
    endsAt.setDate(endsAt.getDate() + 1);
    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt: new Date(),
            endsAt: new Date()
        });
    }).toThrow();
};
