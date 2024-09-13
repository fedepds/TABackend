 export const getTasks = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/tasks");
        if(!response.ok) {
            throw new Error ("Error on the response");
        }
        const datos = await response.json();
        console.log(datos);
        return datos;
    } catch (error) {
        console.log("There was an error with", error);
    }
};


export const postTasks = async (tasksData) => {
    try {
        const response = await fetch("http://localhost:3000/api/tasks", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tasksData),
        });
        if(!response.ok) {
            throw new Error("Error on the response");
        }
        const datos = await response.json();
        return datos;

    } catch (error) {
        console.log("Ha habido un error", error);
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error("Error on the response");
        }
        console.log("Task deleted successfully");
    } catch (error) {
        console.log("There was an error with", error);
    }
};

export const saveTask = async (id, card) => {
    const updatedTask = {
        title: card.getElementsByClassName('titulo_task')[0].value,
        assignedTo: card.getElementsByClassName('assingedTo')[0].value,
        status: card.getElementsByClassName('status')[0].value,
        priority: card.getElementsByClassName('priority')[0].value,
        description: card.getElementsByClassName('description')[0].value,
        startDate: card.getElementsByClassName('startDate')[0].value,
        endDate: card.getElementsByClassName('endDate')[0].value,
    };

    try {
        const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
        });

        if (!response.ok) {
            throw new Error("Error on the response");
        }
        console.log("Task updated successfully");
        refreshTasks();

    } catch (error) {
        console.log("There was an error with", error);
    }
};

