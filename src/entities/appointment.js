export class Appointment {
    constructor(props) {
        const { startsAt, endsAt } = props;
        if (startsAt <= new Date()) {
            throw new Error('Invalid start date');
        }
        if (endsAt <= startsAt) {
            throw new Error('Invalid end date');
        }
        this.props = props;
    }
    get costumer() {
        return this.props.customer;
    }
    get startsAt() {
        return this.props.startsAt;
    }
    get endsAt() {
        return this.props.endsAt;
    }
}
