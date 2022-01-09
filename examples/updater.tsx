    chunkedCalls.forEach((chunk, index) =>
      multicallContract
        .aggregate(chunk.map(obj => [obj.address, obj.callData]))
        .then(([resultsBlockNumber, returnData]: [BigNumber, string[]]) => {
          // accumulates the length of all previous indices
          const firstCallKeyIndex = chunkedCalls.slice(0, index).reduce<number>((memo, curr) => memo + curr.length, 0)
          const lastCallKeyIndex = firstCallKeyIndex + returnData.length

          dispatch(
            updateMulticallResults({
              chainId,
              results: outdatedCallKeys
                .slice(firstCallKeyIndex, lastCallKeyIndex)
                .reduce<{ [callKey: string]: string | null }>((memo, callKey, i) => {
                  memo[callKey] = returnData[i] ?? null
                  return memo
                }, {}),
              blockNumber: resultsBlockNumber.toNumber()
            })
          )
        })
        .catch((error: any) => {
          console.error('Failed to fetch multicall chunk', chunk, chainId, error)
        })
    )
  }, [chainId, multicallContract, dispatch, serializedOutdatedCallKeys])

  return null
}
