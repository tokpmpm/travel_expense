// ========================================
// 匯率欄位修復測試 - 瀏覽器 Console 測試腳本
// ========================================
// 使用方法：
// 1. 重新載入兩個視窗（確保最新程式碼）
// 2. 在視窗 1 的 Console 貼上並執行此腳本
// 3. 觀察測試結果
// ========================================

console.log('🧪 開始測試匯率欄位修復...');

async function testRateInputFix() {
    console.log('\n📋 測試步驟 1: 取得 NZD 匯率原始值');
    const nzdInput = document.getElementById('rate-nzd');
    const originalRate = nzdInput.value;
    console.log('   ✓ 原始匯率:', originalRate);

    await sleep(1000);

    console.log('\n📋 測試步驟 2: 改變匯率為 99.9 並保持 focus');
    nzdInput.focus();
    nzdInput.value = '99.9';
    // Trigger change event to simulate user input
    nzdInput.dispatchEvent(new Event('input', { bubbles: true }));
    console.log('   ✓ 已改為 99.9，並保持 focus（游標在欄位上）');
    console.log('   ℹ️  等待 4 秒（觸發自動同步計時器）...');

    await sleep(4000);

    console.log('\n📋 測試步驟 3: 檢查 4 秒後（同步已觸發）匯率是否仍為 99.9');
    const valueAfterSync = nzdInput.value;
    if (valueAfterSync === '99.9') {
        console.log('   ✅ 成功！匯率仍為 99.9');
        console.log('   ✅ 修復有效：即使觸發了 realtime 同步，focus 的欄位也不會被覆寫');
    } else {
        console.log('   ❌ 失敗！匯率變回:', valueAfterSync);
        console.log('   ❌ 修復無效：欄位被同步覆寫了');
    }

    await sleep(1000);

    console.log('\n📋 測試步驟 4: 移除 focus（blur）');
    nzdInput.blur();
    console.log('   ✓ 已移除 focus');
    console.log('   ℹ️  現在匯率可以正常同步到其他視窗了');

    await sleep(3000);

    console.log('\n📋 測試步驟 5: 請到視窗 2 檢查是否同步為 99.9');
    console.log('   ℹ️  請在視窗 2 的 Console 執行：');
    console.log('   document.getElementById("rate-nzd").value');
    console.log('   ✓ 如果顯示 "99.9"，表示同步成功！');

    console.log('\n📋 測試步驟 6: 恢復原始匯率');
    nzdInput.value = originalRate;
    nzdInput.dispatchEvent(new Event('input', { bubbles: true }));
    console.log('   ✓ 已恢復為原始匯率:', originalRate);

    console.log('\n✅ 測試完成！');
    console.log('總結：');
    console.log('- 原始匯率:', originalRate);
    console.log('- 改變後（有 focus）:', '99.9');
    console.log('- 4 秒後（觸發同步但有 focus）:', valueAfterSync);
    console.log('- 測試結果:', valueAfterSync === '99.9' ? '✅ 通過' : '❌ 失敗');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 執行測試
testRateInputFix();
