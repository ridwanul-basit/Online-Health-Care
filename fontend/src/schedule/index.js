import toast from 'react-hot-toast';

export const getAppointment = () => {
    const appoint = localStorage.getItem('Appointment');
    if (appoint) return JSON.parse(appoint);
    return [];
};

export const addAppointment = (appoin) => {
    const appoint = getAppointment();
    const isExit = appoint.find(a => a.id === appoin.id);
    
    if (isExit) {
        toast.error('This appointment already added!');
        return false;
    }
    
    appoint.push(appoin);
    localStorage.setItem('Appointment', JSON.stringify(appoint));
    toast.success(`Appointment Of ${appoin.name} added`);
    return true;
};

export const removeAppointment = (id) => {
    const appoint = getAppointment();
    const remaining = appoint.filter(last => last.id !== id);
    localStorage.setItem('Appointment', JSON.stringify(remaining));
    toast.error(`Appointment removed`);
    return remaining;
};