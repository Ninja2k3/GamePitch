export const myFetchGetRequest = async () =>{
    const response = await fetch('https://jsonplaceholder.typicode.com/comments')
    const resJson = await response.json();
    return resJson
}