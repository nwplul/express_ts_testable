var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Appointment } from "../entities/appointment";
export class CreateAppointment {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    execute({ customer, startsAt, endsAt }) {
        return __awaiter(this, void 0, void 0, function* () {
            const overLappingAppointment = yield this.appointmentRepository.findOverLappingAppointment(startsAt, endsAt);
            if (overLappingAppointment) {
                throw new Error('Another appointment overlaps this appointment dates');
            }
            const appointment = new Appointment({
                customer,
                startsAt,
                endsAt,
            });
            yield this.appointmentRepository.create(appointment);
            return appointment;
        });
    }
}
