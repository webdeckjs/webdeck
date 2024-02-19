import { StreamDeckWeb, getStreamDecks, requestStreamDecks } from "@elgato-stream-deck/webhid";
import { useCallback, useEffect, useState } from "react";

export const useStreamDeck = () => {
    const [selected, setSelected] = useState<number | undefined>(0);
    const [streamDeck, setStreamDeck] = useState<StreamDeckWeb | null>();
    const [pressedMap, setPressedMap] = useState<{[key: number]: boolean}>({});

    const onMouseDown = (keyIndex: number) => {
        streamDeck!.fillKeyColor(keyIndex, 255, 0, 0)
    }

    const onMouseUp = (keyIndex: number) => {
        streamDeck!.fillKeyColor(keyIndex, 0, 0, 0)
    }

    const addEvents = (_streamDeck: StreamDeckWeb) => {
        _streamDeck.on('down', (keyIndex) => {
            setPressedMap((old) => ({
                ...old,
                [keyIndex]: true
            }));
        });
        _streamDeck.on('up', (keyIndex) => {
            setPressedMap((old) => ({
                ...old,
                [keyIndex]: false
            }));
        });
    }

    useEffect(() => {
        const execute = async () => {
            let [_streamDeck] = await getStreamDecks();
            if(_streamDeck) {
                addEvents(_streamDeck);
                setStreamDeck(_streamDeck);
            }
        };
        execute();
    }, [])
    
    const tryGetStreamDeck = useCallback(async () => {
        let [_streamDeck] = await requestStreamDecks();
        if(!_streamDeck) {
            console.error('Couldn’t get a Stream Deck');
        } else {
            addEvents(_streamDeck);
            setStreamDeck(streamDeck);
        }
    }, [streamDeck]);
   
    return {
        streamDeck,
        tryGetStreamDeck,
        pressedMap,
        onMouseDown,
        onMouseUp,
        selected,
        setSelected
    };
}
