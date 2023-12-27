import got from 'got'



function getWeekDates() {
    let endDate = new Date();
    let endDate2 = new Date();

    let istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    endDate = new Date(endDate.getTime() + istOffset);

    // console.log(endDate.getDay() - 1)
    endDate.setDate(endDate.getDate() - endDate.getDay())
    // console.log(endDate)
    let startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 12 * 7);
    let weeklyLists = [];

    while (startDate <= endDate) {
        let weekList = [];

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            if(currentDate > new Date(endDate2.getTime() + istOffset)){
                break
            }
            weekList.push(currentDate.toISOString().split('T')[0]);
        }

        weeklyLists.push(weekList);

        startDate.setDate(startDate.getDate() + 7);
    }

    return weeklyLists;
}

export const pushEvents = async(req,res) => {

    const {username} = req.body
    const events = []
    const pushEvents = []
    const contributions = []
    let page = 1
    // let username = 'Misbah-khanam'
    // console.log(username)
    let max = 0

    let weeklyLists = getWeekDates();
    // console.log(weeklyLists);


    while((body && JSON.parse(body).length>0) || page==1){
        const url = `https://api.github.com/users/${username}/events?page=${page}`
        var { body } = await got(url)
        // console.log(JSON.parse(body))
        page++
        // console.log(page,body.length)
        events.push(...JSON.parse(body))
    }

    for(let i=0; i<events.length;i++){
        // if(events[i].type === "CreateEvent"){
        //     console.log(events[i])
        // }
        if(events[i].type !== "WatchEvent" ){
            pushEvents.push(events[i])
        }
    }

    for(let j =0;j<weeklyLists.length;j++){
        var temp_array = []
        for(let k=0;k<weeklyLists[j].length;k++){
            var count = 0
            for(let i=0; i<pushEvents.length;i++){
                if(weeklyLists[j][k] === new Date(new Date(pushEvents[i].created_at).getTime() + 5.5 * 60 * 60 * 1000 ).toISOString().split('T')[0] ){
                    count = count + 1
                }
            }
            if(count > max){
                max = count
            }
            temp_array.push(count)
        }
        contributions.push(temp_array)
    }


    // console.log(events)
    res.status(200).json({pushEvents,contributions,max,events})
}

export const repoDetails = async(req,res) => {
    const {username,repo_name} = req.body

    // const username = 'Misbah-khanam'
    // const repo_name = 'MobileArenaFe'

    const data = {}

    const url = `https://api.github.com/repos/${username}/${repo_name}`
    var { body } = await got(url)

    if(body.length > 0){
        data['id'] = JSON.parse(body).id
        data['owner_name'] = JSON.parse(body).owner.login
        data['owner_avatar'] = JSON.parse(body).owner.avatar_url
        data['size'] = JSON.parse(body).size
        data['language'] = JSON.parse(body).language
        data['visibility'] = JSON.parse(body).visibility
        data['forks'] = JSON.parse(body).forks
        data['default_branch'] = JSON.parse(body).default_branch
        data['watchers'] = JSON.parse(body).watchers
        data['subscribers_count'] = JSON.parse(body).subscribers_count
    }

    res.status(200).json({data})

}