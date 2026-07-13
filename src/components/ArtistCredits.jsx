import { useState } from 'react'

const artists = [
  { character: 'Sunless', artist: 'alyssak437', url: 'https://www.tiktok.com/@alyssak437/photo/7491062585001839878?is_from_webapp=1&sender_device=pc' },
  { character: 'Nephis', artist: 'N/A', url: 'https://mx.pinterest.com/pin/16958936095744952/' },
  { character: 'Cassie', artist: 'Logicsterr', url: 'https://x.com/Logicsterrr/status/1885163124967292931?s=20'},
  { character: 'Jet', artist: 'Logicsterrr', url: 'https://x.com/Logicsterrr/status/1889359140805550456'},
  { character: 'Effie', artist: 'L3XARTS', url: 'https://www.reddit.com/r/ShadowSlave/comments/1i4797c/effie/'},
  { character: 'Kai', artist: 'Logicsterrr', url: 'https://x.com/Logicsterrr/status/1940624535067488382?s=20'},
  { character: 'Mordret', artist: 'g1lox on discord', url: 'https://discord.com/channels/982182985862377522/982239318309474344/1404450613344866398' },
  { character: 'Morgan', artist: 'ellieaedon', url: 'https://x.com/ellieaedon/status/2018140415552270561/photo/1'},
  { character: 'Gunlaug', artist: 'Logicsterrr', url: 'https://x.com/Logicsterrr/status/1892051329310151011?s=20'},
  { character: 'Ki Song', artist: 'Logicsterrr', url: 'https://x.com/Logicsterrr/status/1891730738774433999/photo/3'},
  { character: 'Soul Stealer', artist: 'Gloxart', url: 'https://x.com/GloxartX/status/2062134199235092796/photo/1'},
  { character: 'Anvil', artist: 'Logicsterrr', url: 'https://x.com/Logicsterrr/status/1906038941502849312'},
  { character: 'Asterion', artist: 'Anjens', url: 'https://x.com/Anjens_real/status/2014443178506490082/photo/1'},
  { character: 'Rain', artist: 'Kyta', url: 'https://x.com/Kyta_5/status/1869274883466883392/photo/1'},
  { character: 'Wallpaper With VTB and Sunny', artist: 'Logicsterrr', url: 'https://x.com/Logicsterrr/status/1910213967634477073/photo/1'},
  { character: 'Revel', artist: 'L3XARTS', url: 'https://www.reddit.com/r/ShadowSlave/comments/1mo1hz0/revel_fanart_by_me/'},
  { character: 'Noctis', artist: 'Logicsterrr', url: 'https://x.com/Logicsterrr/status/1932626804575252570/photo/1'},
  { character: 'Solvane', artist: 'L3XARTS', url: 'https://www.reddit.com/r/ShadowSlave/comments/1m12hsd/solvane_fanart_havent_posted_in_here_for_a_while/'},
  { character: 'Seishan', artist: 'L3XARTS', url: 'https://www.tiktok.com/@l3xarts17/video/7555074404741319944'},
  { character: 'Tyris', artist: 'L3XARTS', url: 'https://www.tiktok.com/@l3xarts17/photo/7476843522012859655'},
  { character: 'Orphne', artist: 'L3XARTS', url: 'https://www.tiktok.com/@l3xarts17'},
  { character: 'Auro', artist: 'Anjens', url: 'https://www.instagram.com/p/DHoHclUt65O/'},
  { character: 'Beastmaster', artist: 'artSkiddy69', url: 'https://x.com/artSkiddy69/status/1966538038340731298/photo/1'},
  { character: 'Tamar', artist: 'ObsCureArty', url:'https://x.com/d68369620/status/2001113654305948015/photo/1'},
  { character: 'Samara', artist: 'TwilightDraws04', url: 'https://x.com/TwilightDraws04/status/1999904624158068829/photo/1'},
  { character: 'Smile of Heaven', artist: 'TwilightDraws04', url: 'https://x.com/TwilightDraws04/status/1934832736944181277?s=20'},
  { character: 'Broken Sword', artist: 'Logicsterrr', url: 'https://x.com/Logicsterrr/status/1896428732308664831?s=20'},
  { character: 'Weavers Mask', artist: 'Shadow Slave Wiki', url: 'https://shadowslave.fandom.com/wiki/Mask_of_Weaver?file=Mask7.jpg'},
  { character: 'Torment', artist: 'NerdGhost', url: 'https://www.tiktok.com/@nerdghost_art/video/7539236081560980754'},
  { character: 'Dread Lord', artist: 'Gloxart', url: 'https://x.com/GloxartX/status/2063228782744375728/photo/1'},
  { character: 'Undying Slaughter', artist: 'Gloxart', url: 'https://x.com/GloxartX/status/2061767877405860286/photo/1'},
  { character: 'Devouring Beast', artist: 'Gloxart', url: 'https://x.com/GloxartX/status/2061500957268025581/photo/1'},
]

function ArtistCredits() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Persistent tab at the bottom */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 border-b-0 text-zinc-400 hover:text-white text-xs tracking-widest uppercase px-6 py-2 transition-colors"
      >
        Art Credits
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-none shadow-2xl p-6 max-w-md w-full max-h-[80vh] flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-white font-bold tracking-widest uppercase text-sm">Art Credits</h2>
              <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white transition">✕</button>
            </div>
            <p className="text-zinc-500 text-xs">All character art belongs to their respective artists. Please support them and their amazing work! Some art was found on pinterest so if I cannot find the direct source the pinterest link will be connected. </p>
            <div className="overflow-y-auto flex flex-col gap-2 pr-6">
              {artists.map(({ character, artist, url }) => (
                <div key={character} className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="text-zinc-300 text-sm">{character}</span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white text-sm transition"
                  >
                    {artist} ↗
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default ArtistCredits