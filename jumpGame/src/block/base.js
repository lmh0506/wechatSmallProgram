import blockConf from '../../confs/block.conf'

class BaseBlock {
  constructor(type) {
    this.type = type
    this.width = blockConf.width
    this.height = blockConf.height
  }
}

export default BaseBlock
