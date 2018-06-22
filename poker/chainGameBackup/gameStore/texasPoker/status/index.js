"use strict";
export function tableInit(store,data){
	store.dispatch({
		type:"TABLE_INIT",
		data:data,
	});
};
export function newPlayer(store,data){
	//update tablesnapshot add new player
    let storeData = store.getState().table.data;
    let players = store.getState().table.data.snapshot.players;  //players数组
    let playersNum = store.getState().table.data.snapshot.table.players;  //玩家数量
	players.push(data);  //players array add new player
    playersNum = Number(playersNum)+1;
    storeData.snapshot.players = players;
    storeData.snapshot.table.players = playersNum;
    store.dispatch({
		type:"NEW_PLAYER",
		data:storeData
	});
};
export function sit(store,data){
    let storeData = store.getState().table.data;
	const seatNo = data.seatNo;
	const action = data.action;
	let players = storeData.snapshot.players;  //players数组
	for(let i=0;i<players.length;i++){
		if(players[i].seatNo ==seatNo ) return players[i].status=action;
	}
	store.dispatch({  //update
		type:"SIT",
		data:storeData,
	});
};
export function leave(store,data){
	let storeData = store.getState().table.data;
	let players = store.getState().table.data.snapshot.players;  //players数组
	const playersNum = store.getState().table.data.snapshot.table.players;  //玩家数量
	//当前活跃玩家数量
	let activePlayers = store.getState().table.data.snapshot.hand;
	const leavePlayerNo = data.seatNo; 
	//update 
	for(let i=0;i<players.length;i++){
		if(players[i].seatNo == leavePlayerNo){
			if(players.status == "active"){ //if active,must be update activePlayers;
				for(let j=0;j<leavePlayerNo.length;j++){
					if(leavePlayerNo[i].seatNo==leavePlayerNo){
						leavePlayerNo.splice(i,1); //remove 
					}
				}
			}
			players.splice(i,1);			
		}
	}
	store.getState().table.data.snapshot.table.players = Number(playersNum) - 1;
	storeData.snapshot.players = players;
	storeData.snapshot.hand = activePlayers;
	store.dispatch({
		type:"LEAVE",
		data:storeData
	});
};
export function leaveReply(store){
    //init table
	dispatch({
		type:"LEAVE_REPLY",
	})
}