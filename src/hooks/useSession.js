import Dexie from 'dexie';

const db = new Dexie('sfb-session');
    db.version(1).stores({
        players: '++id, name, *ships', // Primary key and indexed props
    });

export { db };