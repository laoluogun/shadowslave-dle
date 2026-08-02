import { useState } from 'react'
import { characters } from '../data/characters'

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
  { character: 'Mad Prince', artist: 'L3XARTS', url: 'https://www.reddit.com/r/ShadowSlave/comments/1hk2lo6/the_mad_prince/'},
  { character: 'Weaver', artist: 'Sayg15000', url: 'https://x.com/sayg15000/status/2006828172386664685/photo/1' },
  { character: 'Nether', artist: 'Logicsterrr', url: 'https://x.com/Logicsterrr/status/1929036401716117878/photo/1'},
  { character: 'Hope', artist: 'Varyl', url: 'https://x.com/VaryielJadestar/status/1787003979697885301/photo/1'},
  { character: 'Mountain King Larva', artist: 'Logicsterrr', url: 'https://x.com/Logicsterrr/status/1922517620789518721/photo/1'},
  { character: 'Caster', artist: 'appapie_', url: 'https://www.tiktok.com/@appapie_/photo/7578426621766438177'},
  { character: 'Jest', artist: 'Unlikely_Editor1602', url: 'https://www.reddit.com/r/ShadowSlave/comments/1m7gpux/cassie_vs_jest/'},
  { character: 'Naeve', artist: 'mystichromatic', url: 'https://x.com/MystiChromatic/status/2021722862550184351?s=20'},
  { character: 'Telle', artist: 'Logicsterrr', url: 'https://x.com/Logicsterrr/status/1917967933076029605?s=20'}, 
  { character: 'Obel and Julius', artist: 'Sayg1500', url: 'https://x.com/sayg15000/status/2012687210617639356?s=20'},
  { character: 'Aiko', artist: 'L3XARTS', url: 'https://www.tiktok.com/@l3xarts17/photo/7567677999059930376'},
  { character: 'Azarax', artist: 'whitebeard5793', url: 'https://discordapp.com/channels/982182985862377522/982239318309474344/1525640441297637577'},
  { character: 'Sid', artist: 'Unknown', url: 'https://discordapp.com/channels/982182985862377522/982239318309474344/1332777088641536062'},
  { character: 'Harus', artist: 'L3XARTS', url: 'https://www.tiktok.com/@l3xarts17/photo/7482319605738917127'},
  { character: 'Windflower', artist: 'TwilightDraws04', url: 'https://x.com/TwilightDraws04/status/1991396890852880645/photo/1'},
  { character: 'Stev', artist: 'som_0777', url:'https://discordapp.com/channels/982182985862377522/982239318309474344/1521128806268670225'},
  { character: 'Madoc', artist: 'drew1975', url: 'https://discordapp.com/channels/982182985862377522/982239318309474344/1342539692461260811'},
  { character: 'Gilead', artist: 'genuineelf80093', url: 'https://discordapp.com/channels/982182985862377522/982239318309474344/1529012984922247318'},
  { character: 'Lonesome Howl', artist:'sdrav', url: 'https://discordapp.com/channels/982182985862377522/982239318309474344/1295130542496551003'},
  { character: 'Moonveil', artist: 'TwilightDraws04', url: 'https://x.com/TwilightDraws04/status/2040875905275310459?s=20'},
  { character: 'Dire Fang', artist: 'Sh1fted_1', url: 'https://discordapp.com/channels/982182985862377522/982239318309474344/1457491663868919929'},
  { character: 'Nightwalker', artist: 'whitebeard5793', url: 'https://discordapp.com/channels/982182985862377522/982239318309474344/1443013919403802866'},
  { character: 'Aether', artist: 'whitebeard5793', url: 'https://discordapp.com/channels/982182985862377522/982239318309474344/1395174870077280508'},
  { character: 'Roan', artist: 'Bigbistoi', url: 'https://x.com/Bigbistoi/status/2068363765725450643?s=20'},
  { character: 'Daeron', artist: 'Nowen', url: 'https://www.instagram.com/p/DXFHWdsApvq/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='},
  { character: 'Ananke', artist: 'mimi_06682', url: 'https://discordapp.com/channels/982182985862377522/982239318309474344/1496772084758741142'},
  { character: 'Elyas', artist:  'L3XARTS', url: 'https://www.tiktok.com/@l3xarts17/photo/7501625875662687495'},
  { character: 'Ariel', artist: 'adamthe3rd', url: 'https://discordapp.com/channels/982182985862377522/982239318309474344/1323600680598114386'},
  { character: 'Beth', artist: 'TwilightDraws04', url: 'https://discordapp.com/channels/982182985862377522/982239318309474344/1370196281716244570'},
  { character: 'Cor', artist: 'mystichromatic', url: 'https://discordapp.com/channels/982182985862377522/982239318309474344/1442875315633524816'},
  { character: 'Saint', artist: 'artistpassingby', url: 'https://www.instagram.com/p/Da0HLHoE59f/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA'},
  { character: 'Eurys', artist: 'dqreaper', url: 'https://discordapp.com/channels/982182985862377522/982239318309474344/1490828568043847893'},
  { character: 'Ling', artist: 'denis322q', url: 'https://discordapp.com/channels/982182985862377522/982239318309474344/1354073701779374181'},
  { character: 'Harper', artist: 'europas.opal', url: 'https://discordapp.com/channels/982182985862377522/982239318309474344/1505351735776907375'},
  { character: 'Dorn', artist: 'L3XARTS', url: 'https://www.instagram.com/p/DSGEwX5k-9L/'},
  { character: 'Bloodwave', artist: 'aeolus.thewindspirit', url :'https://discordapp.com/channels/982182985862377522/982239318309474344/1371026931155341343'}
]

function ArtistCredits() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Tab at the bottom of the page, not fixed to viewport */}
      <div className="flex justify-center mt-auto pt-4">
        <button
          onClick={() => setOpen(true)}
          className="bg-zinc-900 border border-zinc-700 border-b-0 text-zinc-400 hover:text-white text-xs tracking-widest uppercase px-6 py-2 transition-colors cursor-pointer"
        >
          Art Credits
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-none shadow-2xl p-6 max-w-md w-full max-h-[80vh] flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-white font-bold tracking-widest uppercase text-sm">Art Credits</h2>
              <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white transition cursor-pointer">✕</button>
            </div>
            <p className="text-zinc-500 text-xs">All character art belongs to their respective artists. Please support them and their amazing work! Any art with a discord link is from the Shadow Slave server. Some art was found on pinterest so if I cannot find the direct source the pinterest link will be connected. </p>
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