var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";
describe('Create Appointment', () => {
    it('should be able to create an appointment'), () => {
        const appointmentRepository = new InMemoryAppointmentsRepository();
        const createAppointment = new CreateAppointment(appointmentRepository);
        const startsAt = getFutureDate('2022-08-10');
        const endsAt = getFutureDate('2022-08-11');
        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt,
        })).resolves.toBeInstanceOf(Appointment);
    };
    it('should not be able to create an appointment with overlapping dates'), () => __awaiter(void 0, void 0, void 0, function* () {
        const appointmentRepository = new InMemoryAppointmentsRepository();
        const createAppointment = new CreateAppointment(appointmentRepository);
        const startsAt = getFutureDate('2022-08-10');
        const endsAt = getFutureDate('2022-08-15');
        yield createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt,
        });
        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2022-08-14'),
            endsAt: getFutureDate('2022-08-18')
        })).rejects.toBeInstanceOf(Error);
    });
});
