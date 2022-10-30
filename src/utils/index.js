import "firebase/firestore";
import { deleteDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "./../firebase"

export const TaskStatus = Object.freeze({
    Running: "SEDANG BERJALAN",
    Completed: "SELESAI",
    Missed: "TERLEWAT"
})

export async function getRunningTask() {
    const q = query(db, where("status", "==", TaskStatus.Running), orderBy("endAt", "asc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot

}

export async function getCompletedTask() {
    const q = query(db, where("status", "==", TaskStatus.Completed))
    const querySnapshot = await getDocs(q)
    return querySnapshot
}

export async function getMissedTask() {
    const q = query(db, where("status", "==", TaskStatus.Missed))
    const querySnapshot = await getDocs(q)
    return querySnapshot
}


export function deleteTask(id) {
    deleteDoc(db, id)
}

export function updateTask(id, data) {
    updateDoc(db, id, data)
}