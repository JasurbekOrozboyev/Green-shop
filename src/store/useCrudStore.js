import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export default useCrudStore = create(
persist(
    (set) => ( {
        users: [],
        userAdd: (user) => set((state) => ({users: [...state.users, user]})),
    }),
    {name: "users"}
)
)