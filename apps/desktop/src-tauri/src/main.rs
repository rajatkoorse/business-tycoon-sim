// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn steam_unlock_achievement(id: String) -> Result<bool, String> {
    println!("[Steamworks] Unlocking achievement: {}", id);
    Ok(true)
}

#[tauri::command]
fn steam_set_rich_presence(status: String) -> Result<bool, String> {
    println!("[Steamworks] Rich Presence: {}", status);
    Ok(true)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            steam_unlock_achievement,
            steam_set_rich_presence
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
