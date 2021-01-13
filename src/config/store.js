import React from 'react'
import SyncStorage from 'sync-storage';

export default store = async() => {
    const data = await SyncStorage.init();
    console.log('Store ready!', data);
}