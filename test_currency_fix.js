// ========================================
// 幣別欄位修復測試腳本
// ========================================
// 使用方法：
// 1. 在兩個視窗都開啟開發者工具（F12 或 Cmd+Option+I）
// 2. 在視窗 1 的 Console 中貼上並執行此腳本
// 3. 觀察視窗 1 和視窗 2 的變化
// ========================================

console.log('🧪 開始測試幣別欄位修復...');

async function testCurrencyFix() {
    console.log('\n📋 測試步驟 1: 取得第一筆記錄的原始幣別');
    const row = document.querySelectorAll('#table-body tr')[0];
    const currSelect = row.querySelector('.currency-select');
    const originalCurrency = currSelect.value;
    console.log('   ✓ 原始幣別:', originalCurrency);

    await sleep(1000);

    console.log('\n📋 測試步驟 2: 改變幣別為 NZD 並保持 focus');
    currSelect.focus();
    currSelect.value = 'NZD';
    markModified(currSelect);
    calculateRow(row.querySelector('.amount-input'));
    console.log('   ✓ 已改為 NZD，並保持 focus（游標在欄位上）');
    console.log('   ℹ️  這時會觸發 2 秒自動同步計時器');

    await sleep(4000);

    console.log('\n📋 測試步驟 3: 檢查 4 秒後（同步已觸發）幣別是否仍為 NZD');
    const valueAfterSync = currSelect.value;
    if (valueAfterSync === 'NZD') {
        console.log('   ✅ 成功！幣別仍為 NZD');
        console.log('   ✅ 修復有效：即使觸發了 realtime 同步，focus 的欄位也不會被覆寫');
    } else {
        console.log('   ❌ 失敗！幣別變回:', valueAfterSync);
        console.log('   ❌ 修復無效：欄位被同步覆寫了');
    }

    await sleep(1000);

    console.log('\n📋 測試步驟 4: 移除 focus（blur）');
    currSelect.blur();
    console.log('   ✓ 已移除 focus');
    console.log('   ℹ️  現在資料可以正常同步到其他視窗了');

    await sleep(3000);

    console.log('\n📋 測試步驟 5: 請到視窗 2 檢查是否同步為 NZD');
    console.log('   ℹ️  請在視窗 2 的 Console 執行以下指令：');
    console.log('   document.querySelectorAll("#table-body tr")[0].querySelector(".currency-select").value');
    console.log('   ✓ 如果顯示 "NZD"，表示同步成功！');

    console.log('\n✅ 測試完成！');
    console.log('總結：');
    console.log('- 原始幣別:', originalCurrency);
    console.log('- 改變後（有 focus）:', 'NZD');
    console.log('- 4 秒後（觸發同步但有 focus）:', valueAfterSync);
    console.log('- 預期視窗 2 的幣別:', valueAfterSync === 'NZD' ? 'NZD（同步成功）' : '請檢查');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 執行測試
testCurrencyFix();
